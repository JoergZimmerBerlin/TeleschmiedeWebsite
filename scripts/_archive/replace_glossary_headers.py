import os
import glob
import re
import hashlib

glossary_dir = "/Users/jorti/Documents/Antigravity/src/content/glossar"
files = glob.glob(os.path.join(glossary_dir, "*.md"))

replaced_count = 0

# Random highly personal, direct Jörg headers
replacements = [
    "### Mein Tacheles-Rat für dich",
    "### Dein nächster Schritt",
    "### Was du jetzt tun solltest",
    "### Jörgs Action-Plan",
    "### Mein Fazit aus der Praxis"
]

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # The glossary files all currently use exactly this header for the conclusion
    pattern = r'^## Was du jetzt tun solltest$'
    
    if re.search(pattern, content, flags=re.MULTILINE):
        filename = os.path.basename(file_path)
        hash_val = int(hashlib.md5(filename.encode('utf-8')).hexdigest(), 16)
        # Avoid picking the exact same phrase we are trying to replace
        replacement_header = replacements[hash_val % len(replacements)]
        if replacement_header == "### Was du jetzt tun solltest":
            replacement_header = "## Mein Tacheles-Rat für dich"
        else:
             # Ensure we keep the H2 level
             replacement_header = replacement_header.replace("###", "##")
        
        new_content = re.sub(pattern, replacement_header, content, flags=re.MULTILINE)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        replaced_count += 1

print(f"Replaced generic conclusion headers in {replaced_count} glossary articles with personal Jörg-Brand headers.")
