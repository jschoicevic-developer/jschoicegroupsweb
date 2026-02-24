import os

src_dir = r"d:\CruxLabs\Projects\JSChoice\JSChoiceGroups\src\app\(website)"

def format_title(folder):
    words = folder.split('-')
    words = [w.upper() if w.lower() == 'ndis' else w.capitalize() for w in words]
    return ' '.join(words)

cnt = 0
for root, dirs, files in os.walk(src_dir):
    if "page.tsx" in files:
        if os.path.normpath(root) == os.path.normpath(src_dir):
            continue
            
        folder_name = os.path.basename(root)
        if '[' in folder_name:
            continue
            
        layout_path = os.path.join(root, "layout.tsx")
        # If there's no layout.tsx
        if not os.path.exists(layout_path):
            title = format_title(folder_name)
            
            content = f"""import type {{ Metadata }} from 'next';

export const metadata: Metadata = {{
    title: "{title} | JS Choice Care & Support",
    description: "Discover {title} services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: {{ canonical: 'https://jschoicegroup.com.au/{folder_name}' }}
}};

export default function Layout({{ children }}: {{ children: React.ReactNode }}) {{
    return children;
}}
"""
            with open(layout_path, 'w', encoding='utf-8') as f:
                f.write(content)
            cnt += 1
            print(f'Created layout.tsx for {folder_name}')

print('Created layout.tsx metadata wrappers for', cnt, 'routes')
