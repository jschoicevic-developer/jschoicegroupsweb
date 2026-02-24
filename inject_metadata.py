import os, glob

src_dir = r"d:\CruxLabs\Projects\JSChoice\JSChoiceGroups\src\app\(website)"

def format_title(folder):
    # e.g. "ndis-providers-craigieburn" -> "NDIS Providers Craigieburn"
    words = folder.split('-')
    words = [w.upper() if w.lower() == 'ndis' else w.capitalize() for w in words]
    return ' '.join(words)

cnt = 0
for root, dirs, files in os.walk(src_dir):
    for fn in files:
        if fn == "page.tsx":
            f = os.path.join(root, fn)
            # Avoid the root website page.tsx itself
            if os.path.normpath(root) == os.path.normpath(src_dir):
                continue
                
            folder_name = os.path.basename(root)
            # Ignore dynamic params like [slug]
            if '[' in folder_name:
                continue
                
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # If it doesn't have metadata export
            if 'export const metadata' not in content and 'export function generateMetadata' not in content:
                title = format_title(folder_name)
                
                # We need to insert the metadata import and export
                metadata_block = f"""
import type {{ Metadata }} from 'next';

export const metadata: Metadata = {{
    title: "{title} | JS Choice Care & Support",
    description: "Discover {title} services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: {{ canonical: '/{folder_name}' }}
}};
"""
                # find the first import or 'use client'
                if '"use client"' in content or "'use client'" in content:
                    # Next.js Metadata CANNOT be exported from a Client Component directly in App Router!
                    # Wait! In Next.js app router, "use client" blocks exporting `metadata`.
                    # For client components, you must place metadata in a separate `layout.tsx` or `page.tsx` that wraps it.
                    pass
                else:
                    new_content = metadata_block + "\n" + content
                    with open(f, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    cnt += 1

print('Injected metadata into', cnt, 'files')
