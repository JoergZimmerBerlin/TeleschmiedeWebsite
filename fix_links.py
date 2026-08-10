import os
import re

files = [
    "perplexity-sichtbarkeit.md",
    "ai-visibility-audit.md",
    "ai-visibility-report.md",
    "chatgpt-sichtbarkeit.md",
    "ki-sichtbarkeit-b2b.md",
    "in-ki-antworten-erscheinen.md"
]

base_dir = "/Users/jorti/Documents/Antigravity/src/content/glossar"

for file in files:
    path = os.path.join(base_dir, file)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Fix CTA box link
    content = content.replace('href="https://www.linkedin.com/in/joerg-zimmer-berlin/"', 'href="[ZIEL-URL]"')

    # Replace literal unicode sequences if they exist
    content = content.replace('\\u003c', '<').replace('\\u003e', '>')
    
    # Convert simple HTML links to Markdown links
    content = re.sub(r'<a href="([^"]+)">([^<]+)</a>', r'[\2](\1)', content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
print("Done")
