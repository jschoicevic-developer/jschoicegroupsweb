import os, glob, re

src_dir = r"d:\CruxLabs\Projects\JSChoice\JSChoiceGroups\src"
files = glob.glob(os.path.join(src_dir, '**', '*.tsx'), recursive=True) + glob.glob(os.path.join(src_dir, '**', '*.ts'), recursive=True)

fixed_links = 0
fixed_images = 0

def refine_links(match):
    global fixed_links
    tag = match.group(0)
    
    # Let's extract the inner text of the link
    inner_text_match = re.search(r'>\s*(.*?)\s*<', tag, re.DOTALL)
    inner_text = inner_text_match.group(1).lower() if inner_text_match else ""
    
    # Trigger words
    triggers = ['read more', 'learn more', 'click here', 'here', 'more info']
    if any(t in inner_text for t in triggers) and 'aria-label' not in tag:
        # Inject aria-label right before closing bracket of opening tag
        replacement = tag.replace('>', ' aria-label="' + inner_text.replace('\n', ' ').strip().title() + ' for JS Choice Services">', 1)
        fixed_links += 1
        return replacement
        
    return tag

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    original = content
    
    # Fix Links: Very brittle to do full AST parsing in Python, but we'll try basic Regex
    # We look for <Link ...>...</Link> or <a ...>...</a>
    # Actually, let's just use re.sub for Image to add quality={80} if missing
    new_content = re.sub(r'<Image([^>]+)>', lambda m: m.group(0).replace('<Image', '<Image quality={80}') if 'quality=' not in m.group(0) else m.group(0), content)
    
    if new_content != original:
        fixed_images += 1
        with open(f, 'w', encoding='utf-8') as out:
            out.write(new_content)

print(f'Fixed Maps: {fixed_images} files with Image Quality updates.')
