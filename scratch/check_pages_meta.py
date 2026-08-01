import os
import re
import json

pages_dir = 'src/pages'
pages = [f for f in os.listdir(pages_dir) if f.endswith('.astro') and f not in ('404.astro', 'groundingpage.astro', 'groundingpage-en.astro')]

results = []
for p in pages:
    path = os.path.join(pages_dir, p)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Try to find Layout props
    # Layout title="..." description="..."
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
    print(f"File: {r['file']}")
    print(f"Title: {r['title']} ({r['title_len']})")
    print(f"Desc: {r['desc']} ({r['desc_len']})")
    print("-" * 50)
