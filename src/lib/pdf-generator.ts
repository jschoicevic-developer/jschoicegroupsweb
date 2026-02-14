import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PlanPartnersBudgetItem, SupportPurpose } from '@/types/ndis';

const SUPPORT_PURPOSE_MAP: Record<number, SupportPurpose> = {
  1: 'Core', 2: 'Core', 3: 'Core', 4: 'Core',
  5: 'Capital', 6: 'Capital',
  7: 'Capacity Building', 8: 'Capacity Building', 9: 'Capacity Building',
  10: 'Capacity Building', 11: 'Capacity Building', 12: 'Capacity Building',
  13: 'Capacity Building', 14: 'Capacity Building', 15: 'Capacity Building',
  16: 'Core', 17: 'Capital', 19: 'Capital', 21: 'Core',
};

// Helper to load image
const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

/**
 * Generate PDF Document - Invoice Style
 */
const generatePDFDocument = async (items: PlanPartnersBudgetItem[]): Promise<jsPDF> => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const today = new Date().toLocaleDateString('en-AU', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  let currentY = 15;

  // ===== HEADER SECTION =====
  // 1. Add Logo (Left Side)
  try {
    const logo = await loadImage('/logo.png');
    const logoWidth = 45;
    const logoHeight = (logo.height / logo.width) * logoWidth;
    doc.addImage(logo, 'PNG', 14, currentY, logoWidth, logoHeight);
  } catch (e) {
    console.warn('Logo could not be loaded', e);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text('JS CHOICE GROUP', 14, currentY + 5);
  }

  // 2. Company Information (Right Side)
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('JS CHOICE GROUP', pageWidth - 14, currentY, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80);
  currentY += 5;
  doc.text('ABN: 12 345 678 901', pageWidth - 14, currentY, { align: 'right' });
  currentY += 4;
  doc.text('Phone: 03 9394 6305', pageWidth - 14, currentY, { align: 'right' });
  currentY += 4;
  doc.text('Email: info@jschoicegroup.com.au', pageWidth - 14, currentY, { align: 'right' });

  currentY = 45;

  // 3. Document Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('NDIS BUDGET ESTIMATE', 14, currentY);

  currentY += 8;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`Date: ${today}`, 14, currentY);

  currentY += 10;

  // Divider Line
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(14, currentY, pageWidth - 14, currentY);

  currentY += 10;

  // ===== SUMMARY TABLE (GROUPED BY SUPPORT PURPOSE) =====
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Budget Summary', 14, currentY);
  currentY += 2;

  // Group items by support purpose
  const groups: Record<string, { items: PlanPartnersBudgetItem[], total: number }> = {};
  items.forEach(item => {
    const purpose = SUPPORT_PURPOSE_MAP[item.supportItem.support_category_number] || 'Core';
    if (!groups[purpose]) groups[purpose] = { items: [], total: 0 };
    groups[purpose].items.push(item);
    groups[purpose].total += item.cost;
  });

  const summaryData = Object.entries(groups).map(([purpose, data]) => [
    purpose + ' Supports',
    data.items.length.toString(),
    `$${data.total.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  ]);

  const grandTotal = items.reduce((sum, item) => sum + item.cost, 0);

  autoTable(doc, {
    startY: currentY + 3,
    head: [['Support Purpose', 'Items', 'Total Cost']],
    body: [
      ...summaryData,
      [
        { content: 'TOTAL ANNUAL ESTIMATE', styles: { fontStyle: 'bold', fillColor: [0, 0, 0], textColor: [255, 255, 255] } },
        { content: items.length.toString(), styles: { fontStyle: 'bold', fillColor: [0, 0, 0], textColor: [255, 255, 255], halign: 'center' } },
        { content: `$${grandTotal.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, styles: { fontStyle: 'bold', fillColor: [0, 0, 0], textColor: [255, 255, 255], halign: 'right' } }
      ]
    ],
    theme: 'plain',
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 10,
      cellPadding: 4
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 30, halign: 'center' },
      2: { cellWidth: 50, halign: 'right' }
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
      lineColor: [200, 200, 200],
      lineWidth: 0.1
    },
    alternateRowStyles: {
      fillColor: [250, 250, 250]
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // ===== DETAILED BREAKDOWN TABLE =====
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Detailed Breakdown', 14, currentY);
  currentY += 2;

  const detailedData = items.map(item => [
    item.supportItem.support_item_number,
    item.supportItem.support_item_name,
    item.quantity.toString(),
    `${item.frequencyNumber}/${item.frequencyType}`,
    `$${item.price.toFixed(2)}`,
    `$${item.cost.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  ]);

  autoTable(doc, {
    startY: currentY + 3,
    head: [['Item Code', 'Description', 'Qty', 'Frequency', 'Unit Price', 'Total Cost']],
    body: detailedData,
    theme: 'striped',
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      cellPadding: 4
    },
    columnStyles: {
      0: { cellWidth: 28, fontSize: 8 },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 15, halign: 'center' },
      3: { cellWidth: 22, fontSize: 8 },
      4: { cellWidth: 25, halign: 'right' },
      5: { cellWidth: 28, halign: 'right', fontStyle: 'bold' }
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      lineColor: [220, 220, 220],
      lineWidth: 0.1
    },
    alternateRowStyles: {
      fillColor: [248, 248, 248]
    }
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // ===== FOOTER SECTION =====
  // Add a divider before footer
  doc.setDrawColor(0);
  doc.setLineWidth(0.5);
  doc.line(14, currentY, pageWidth - 14, currentY);
  currentY += 8;

  // Important Notes
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('IMPORTANT NOTES:', 14, currentY);
  currentY += 6;

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60);

  const disclaimerLines = [
    '• This is an estimate only. Actual costs may vary based on your specific needs and NDIS plan details.',
    '• JS Choice can only reimburse costs that are approved by the NDIS and included in your plan.',
    '• All prices are based on current NDIS Price Guide rates and are subject to change.',
    '• Please consult with your support coordinator or plan manager before finalizing any services.'
  ];

  disclaimerLines.forEach(line => {
    doc.text(line, 14, currentY);
    currentY += 4;
  });

  currentY += 6;

  // Contact Information Box
  doc.setDrawColor(0);
  doc.setLineWidth(0.3);
  doc.rect(14, currentY, pageWidth - 28, 20);

  currentY += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Questions? Contact Us:', 18, currentY);

  currentY += 5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Phone: 03 9394 6305  |  Email: info@jschoicegroup.com.au  |  Web: www.jschoicegroup.com.au', 18, currentY);

  currentY += 4;
  doc.text('Our friendly team is here to help you understand your NDIS budget and support options.', 18, currentY);

  // Page number at bottom
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  return doc;
};

/**
 * Trigger download of the PDF
 */
export async function downloadAsPDF(items: PlanPartnersBudgetItem[]) {
  const doc = await generatePDFDocument(items);
  doc.save(`NDIS_Budget_Estimate_${new Date().toISOString().split('T')[0]}.pdf`);
}

/**
 * Trigger print flow (opens print dialog)
 */
export async function printToPDF(items: PlanPartnersBudgetItem[]) {
  const doc = await generatePDFDocument(items);
  doc.autoPrint();
  window.open(doc.output('bloburl'), '_blank');
}
