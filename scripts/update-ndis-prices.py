#!/usr/bin/env python3
"""
NDIS Price Update Script — 2026-27 v1.2

Reads the NDIS Pricing Schedule DOCX and generates SQL UPDATE statements
for all support items in the Supabase ndis_support_items table.

Column mapping:
  Document "National"    → price_act, price_nsw, price_nt, price_qld, price_sa, price_tas, price_vic, price_wa
  Document "Remote"      → price_remote
  Document "Very Remote" → price_very_remote

Matching key: support_item_number (unique in DB)
"""

from __future__ import annotations

import re
import sys
import zipfile
from decimal import Decimal, InvalidOperation
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOCX_PATH = ROOT / "price_update" / "ndis-pricing-schedule-2026-27-v1_2 (1).docx"
OUTPUT_SQL = ROOT / "scripts" / "ndis-price-update-2026-27.sql"


def extract_tables_from_docx(docx_path: Path) -> list[list[list[str]]]:
    """Extract all tables from a DOCX file as lists of rows of cell-text."""
    with zipfile.ZipFile(docx_path) as zf:
        xml = zf.read("word/document.xml").decode("utf-8")

    raw_tables = re.findall(r"<w:tbl[ >][\s\S]*?</w:tbl>", xml)
    tables: list[list[list[str]]] = []

    for tbl_xml in raw_tables:
        rows_xml = re.findall(r"<w:tr[ >][\s\S]*?</w:tr>", tbl_xml)
        table_rows: list[list[str]] = []
        for row_xml in rows_xml:
            cells_xml = re.findall(r"<w:tc[ >][\s\S]*?</w:tc>", row_xml)
            row_cells: list[str] = []
            for cell_xml in cells_xml:
                # Match only <w:t> or <w:t xml:space="preserve"> — NOT <w:tcPr>, <w:tcW>, etc.
                texts = re.findall(r"<w:t(?:\s[^>]*)?>(.+?)</w:t>", cell_xml)
                cell_value = "".join(texts).strip()
                # Remove non-breaking space prefix
                cell_value = cell_value.lstrip("\xa0").strip()
                row_cells.append(cell_value)
            table_rows.append(row_cells)
        tables.append(table_rows)

    return tables


def is_pricing_table(table: list[list[str]]) -> bool:
    """Check if a table is a pricing table based on header row."""
    if not table or not table[0]:
        return False
    header = [cell.lower().strip() for cell in table[0]]
    return (
        len(header) >= 6
        and "support item number" in header[0]
        and "national" in header[3]
    )


def parse_price(value: str) -> str | None:
    """Parse a price string like '$82.57' or 'N/A' into a SQL-safe value."""
    cleaned = value.strip().replace("$", "").replace(",", "").strip()
    if not cleaned or cleaned.lower() in ("n/a", "-", ""):
        return None
    try:
        d = Decimal(cleaned)
        return str(d)
    except InvalidOperation:
        return None


def extract_pricing_rows(tables: list[list[list[str]]]) -> list[dict]:
    """Extract all pricing data rows from all pricing tables."""
    all_rows: list[dict] = []
    skipped_tables = 0

    for tbl_idx, table in enumerate(tables):
        if not is_pricing_table(table):
            skipped_tables += 1
            continue

        # Process data rows (skip header = row 0)
        for row_idx, row in enumerate(table[1:], start=1):
            if len(row) < 6:
                continue

            item_number = row[0].strip()
            item_name = row[1].strip()
            unit = row[2].strip()
            national = parse_price(row[3])
            remote = parse_price(row[4])
            very_remote = parse_price(row[5])

            # Skip rows with empty item number (sub-headers or empty rows)
            if not item_number or item_number.lower() == "support item number":
                continue

            # Validate item number format (should contain underscores)
            if "_" not in item_number:
                continue

            all_rows.append({
                "support_item_number": item_number,
                "support_item_name": item_name,
                "unit": unit,
                "national": national,
                "remote": remote,
                "very_remote": very_remote,
                "source_table": tbl_idx,
            })

    return all_rows


def generate_sql(rows: list[dict]) -> str:
    """Generate SQL UPDATE statements for all pricing rows."""
    statements: list[str] = []

    statements.append("-- =============================================================")
    statements.append("-- NDIS Price Update 2026-27 v1.2")
    statements.append(f"-- Generated from: {DOCX_PATH.name}")
    statements.append(f"-- Total items: {len(rows)}")
    statements.append("-- ")
    statements.append("-- Mapping:")
    statements.append("--   National → price_act, price_nsw, price_nt, price_qld, price_sa, price_tas, price_vic, price_wa")
    statements.append("--   Remote → price_remote")
    statements.append("--   Very Remote → price_very_remote")
    statements.append("-- =============================================================")
    statements.append("")
    statements.append("BEGIN;")
    statements.append("")

    for row in rows:
        national_sql = row["national"] if row["national"] else "NULL"
        remote_sql = row["remote"] if row["remote"] else "NULL"
        very_remote_sql = row["very_remote"] if row["very_remote"] else "NULL"

        # Escape single quotes in item number (unlikely but safe)
        item_number_escaped = row["support_item_number"].replace("'", "''")

        sql = f"""UPDATE ndis_support_items
SET
    price_act = {national_sql},
    price_nsw = {national_sql},
    price_nt = {national_sql},
    price_qld = {national_sql},
    price_sa = {national_sql},
    price_tas = {national_sql},
    price_vic = {national_sql},
    price_wa = {national_sql},
    price_remote = {remote_sql},
    price_very_remote = {very_remote_sql},
    updated_at = NOW()
WHERE support_item_number = '{item_number_escaped}';"""
        statements.append(sql)
        statements.append("")

    statements.append("COMMIT;")
    return "\n".join(statements)


def print_preview(rows: list[dict], count: int = 20) -> None:
    """Print a preview table of extracted data for verification."""
    print("\n" + "=" * 100)
    print("PREVIEW — First {} items extracted from DOCX".format(min(count, len(rows))))
    print("=" * 100)
    print(f"{'Item Number':<20} {'Unit':<6} {'National':>10} {'Remote':>10} {'V.Remote':>10}  {'Item Name'}")
    print("-" * 100)

    for row in rows[:count]:
        nat = f"${row['national']}" if row["national"] else "N/A"
        rem = f"${row['remote']}" if row["remote"] else "N/A"
        vr = f"${row['very_remote']}" if row["very_remote"] else "N/A"
        name = row["support_item_name"][:45]
        print(f"{row['support_item_number']:<20} {row['unit']:<6} {nat:>10} {rem:>10} {vr:>10}  {name}")

    print("-" * 100)
    print(f"Total items extracted: {len(rows)}")
    print()


def main() -> None:
    if not DOCX_PATH.exists():
        print(f"ERROR: DOCX file not found at {DOCX_PATH}")
        sys.exit(1)

    print(f"Reading DOCX: {DOCX_PATH.name}")
    tables = extract_tables_from_docx(DOCX_PATH)
    print(f"Found {len(tables)} tables in document")

    pricing_table_count = sum(1 for t in tables if is_pricing_table(t))
    print(f"Identified {pricing_table_count} pricing tables")

    rows = extract_pricing_rows(tables)
    print(f"Extracted {len(rows)} pricing rows")

    if not rows:
        print("ERROR: No pricing data extracted. Check document format.")
        sys.exit(1)

    # Print preview for manual verification
    print_preview(rows)

    # Generate SQL
    sql = generate_sql(rows)
    OUTPUT_SQL.write_text(sql, encoding="utf-8")
    print(f"SQL written to: {OUTPUT_SQL}")
    print(f"File size: {OUTPUT_SQL.stat().st_size / 1024:.1f} KB")
    print(f"\nReview the SQL file, then paste into Supabase SQL Editor to apply.")


if __name__ == "__main__":
    main()
