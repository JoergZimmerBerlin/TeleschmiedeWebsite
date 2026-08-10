import os

files = [
    "perplexity-sichtbarkeit.md",
    "ai-visibility-audit.md",
    "ai-visibility-report.md",
    "chatgpt-sichtbarkeit.md",
    "ki-sichtbarkeit-b2b.md",
    "in-ki-antworten-erscheinen.md"
]

base_dir = "/Users/jorti/Documents/Antigravity/src/content/glossar"

target_url = "https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/"

for file in files:
    path = os.path.join(base_dir, file)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace [ZIEL-URL] with the specific URL
    content = content.replace('[ZIEL-URL]', target_url)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
print("Replaced [ZIEL-URL] with the new LinkedIn URL.")
