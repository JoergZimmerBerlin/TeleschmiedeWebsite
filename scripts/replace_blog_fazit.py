import os
import glob
import re

blog_dir = "/Users/jorti/Documents/Antigravity/src/content/blog"
files = glob.glob(os.path.join(blog_dir, "*.md"))

replaced_count = 0

# Random engaging headers to replace 'Fazit' or similar weak headers
replacements = [
    "### Der Teleschmie-de Action-Plan",
    "### Was du jetzt tun solltest",
    "### Dein nächster Schritt",
    "### Bottom Line für dein Business",
    "### Tacheles am Ende"
]

import hashlib

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Match typical Fazit headers: "## Fazit", "### Fazit", "## Zusammenfassung", "### Kurz gesagt"
    pattern = r'^(##|###)\s*(Fazit|Zusammenfassung|Kurz gesagt|Fazit war gestern|Mein Fazit|Das Wichtigste zum Schluss).*?$'
    
    if re.search(pattern, content, flags=re.MULTILINE | re.IGNORECASE):
        # Pick a consistent replacement based on filename hash
        filename = os.path.basename(file_path)
        hash_val = int(hashlib.md5(filename.encode('utf-8')).hexdigest(), 16)
        replacement_header = replacements[hash_val % len(replacements)]
        
        # Replace the matched header with the new one
        new_content = re.sub(pattern, replacement_header, content, flags=re.MULTILINE | re.IGNORECASE)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        replaced_count += 1
        print(f"Replaced Fazit in: {filename} -> {replacement_header}")

print(f"Total blog articles fixed: {replaced_count}")
