import os, re
from collections import Counter

glossary_dir = '/Users/jorti/Documents/Antigravity/src/content/glossar'

existing = set()
for f in os.listdir(glossary_dir):
    if f.endswith('.md') or f.endswith('.mdx'):
        base = f.replace('.mdx', '').replace('.md', '').replace('-', ' ').lower()
        existing.add(base)

text = ""
for f in os.listdir(glossary_dir):
    if f.endswith('.md') or f.endswith('.mdx'):
        with open(os.path.join(glossary_dir, f), 'r', encoding='utf-8') as file:
            content = file.read()
            content = re.sub(r'^---.*?---', '', content, flags=re.DOTALL)
            text += " " + content

pattern = r'\b[A-ZÄÖÜ][a-zäöüß]+(?:\s+[A-ZÄÖÜ][a-zäöüß]+)+\b'
matches = re.findall(pattern, text)

c = Counter(matches)
count = 0
for term, freq in c.most_common(500):
    t_lower = term.lower()
    if t_lower in existing: continue
    if "seo visibility tools" in t_lower or "seo audit" in t_lower: continue
    
    words = term.split()
    stopwords = {"das", "der", "die", "und", "oder", "ein", "eine", "wir", "ihr", "sie", "es", "ist", "im", "in", "mit", "auf", "von", "zu", "bei", "für", "als", "dass", "wenn", "wie", "was", "warum", "wer", "wo", "welche", "welcher", "welches", "so", "auch", "nur", "dann", "hier", "da", "nach", "sind", "aus", "aber", "um", "den", "dem", "des", "zur", "zum", "am", "vom", "beim", "über", "unter", "vor"}
    if words[0].lower() in stopwords: continue
    if "Jörgs" in term or "Share Of" in term or "Jahr" in term or "Tacheles" in term or "Jörg" in term or "Begriffe" in term or "Side Rendering" in term: continue
    if "Augmented Generation" in term or "Fan" in term or "Card" in term or "Page Audit" in term or "Visibility Audit" in term: continue
    
    print(f"- **{term}** (Häufigkeit: {freq}x)")
    count += 1
    if count >= 30:
        break
