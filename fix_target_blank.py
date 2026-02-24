import os

src_dir = r'd:\CruxLabs\Projects\JSChoice\JSChoiceGroups\src'
cnt = 0
for root, dirs, files in os.walk(src_dir):
    for fn in files:
        if fn.endswith('.tsx') or fn.endswith('.ts'):
            f = os.path.join(root, fn)
            with open(f, 'r', encoding='utf-8') as file:
                content = file.read()
            if 'target="_blank"' in content and 'rel=' not in content:
                content = content.replace('target="_blank"', 'target="_blank" rel="noopener noreferrer"')
                with open(f, 'w', encoding='utf-8') as file:
                    file.write(content)
                cnt += 1
                print('Fixed:', f)
print('Done. Fixed files:', cnt)
