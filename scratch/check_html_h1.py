import os
import re

dist_dir = 'dist'
html_files = []

for root, _, files in os.walk(dist_dir):
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

results = []
for path in html_files:
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
        
        # Case insensitive search for <h1 and </h1>
        # We can just count <h1 
        h1_count = len(re.findall(r'<h1\b', content, re.IGNORECASE))
        
        if h1_count != 1:
            results.append((path, h1_count))

if not results:
    print("ALL CLEAR: Every single HTML file in dist/ has EXACTLY ONE <h1> tag (except maybe those with 0).")
else:
    print(f"Found {len(results)} files with multiple (or zero) H1 tags:")
    for path, count in results:
        print(f"  {count} H1s in: {path.replace('dist/', '')}")
