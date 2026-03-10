import os
import glob
import re

glossary_dir = "/Users/jorti/Documents/Antigravity/src/content/glossar"
files = glob.glob(os.path.join(glossary_dir, "*.md"))

replaced_count = 0

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace "Mein Fazit aus der Praxis" with "Mein Tacheles-Rat für dich"
    if "Fazit" in content:
        new_content = re.sub(r'#+\s+Mein Fazit aus der Praxis', r'## Mein Tacheles-Rat für dich', content)
        new_content = re.sub(r'\bFazit\b', 'Resümee', new_content) # catch any other standalone 'Fazit' in text
        
        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            replaced_count += 1

print(f"Removed 'Fazit' from {replaced_count} glossary articles.")
