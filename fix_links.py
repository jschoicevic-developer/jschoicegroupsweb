import os, glob, re

src_dir = r"d:\CruxLabs\Projects\JSChoice\JSChoiceGroups\src"
files = glob.glob(os.path.join(src_dir, '**', '*.tsx'), recursive=True) + glob.glob(os.path.join(src_dir, '**', '*.ts'), recursive=True)

fixed_links = 0

def refine_links(match):
    global fixed_links
    # match.group(0) is the entire <Link ...>...</Link> string
    tag_content = match.group(0)
    
    # We want to find the text between the opening <Link> tag and closing </Link> tag
    text_match = re.search(r'>([^<]+)</td>|>\s*([^<]+?)\s*<', tag_content)
    if text_match:
        text = text_match.group(2) if text_match.group(2) else text_match.group(1)
        if text:
            # Check if text is non-descriptive
            triggers = ['read more', 'learn more', 'click here', 'here', 'more info']
            if any(t in text.lower() for t in triggers) and 'aria-label=' not in tag_content:
                # Add aria-label right after <Link 
                # Be careful, could be multiline or have other props
                new_tag = tag_content.replace('<Link ', f'<Link aria-label="{text.strip().title()} about JS Choice Care NDIS Services" ', 1)
                fixed_links += 1
                return new_tag
                
    return tag_content

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    original = content
    
    # Simple regex to find Link blocks
    new_content = re.sub(r'<Link[^>]*>[\s\S]*?<\/Link>', refine_links, content)
    
    # Also for classic anchor tags nested
    new_content = re.sub(r'<a[^>]*>[\s\S]*?<\/a>', refine_links, new_content)
    
    if new_content != original:
        with open(f, 'w', encoding='utf-8') as out:
            out.write(new_content)

print(f'Fixed Links: {fixed_links} replaced with ARIA Labels.')
