import os
import re

dirs = ['src/pages/blog', 'src/pages/glossar', 'src/pages/tools']
files_to_check = []

for d in dirs:
    for f in os.listdir(d):
        if f.endswith('.astro') and f != '[slug].astro':
            files_to_check.append(os.path.join(d, f))

results = []
for p in files_to_check:
    with open(p, 'r', encoding='utf-8') as f:
        content = f.read()
    
    title_match = re.search(r'title=(["\'])(.*?)\1', content)
    desc_match = re.search(r'description=(["\'])(.*?)\1', content)
    
    title = title_match.group(2) if title_match else None
    desc = desc_match.group(2) if desc_match else None
    
    results.append({
        'file': p,
        'title': title,
        'title_len': len(title) if title else 0,
        'desc': desc,
        'desc_len': len(desc) if desc else 0
    })

for r in results:
    if r['title_len'] > 50 or r['desc_len'] > 150:
        print(f"File: {r['file']}")
        print(f"Title: {r['title']} ({r['title_len']})")
        print(f"Desc: {r['desc']} ({r['desc_len']})")
        print("-" * 50)
    else:
        print(f"OK: {r['file']} - Title: {r['title_len']}, Desc: {r['desc_len']}")
