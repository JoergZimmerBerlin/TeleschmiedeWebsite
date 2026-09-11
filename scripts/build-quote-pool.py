import json
import os
import re

# Load LinkedIn quotes
with open('src/data/joerg-quotes.json', 'r', encoding='utf-8') as f:
    linkedin_raw = json.load(f)

# Load YouTube transcript quotes
with open('src/data/joerg-youtube-transcripts.json', 'r', encoding='utf-8') as f:
    youtube_raw = json.load(f)

quote_pool = []
quote_id = 0

# 1. Process LinkedIn Quotes
for item in linkedin_raw:
    quote_text = item.get('quote', '').strip()
    if quote_text.startswith("Zusammenfassend ist es wichtig"):
        quote_text = quote_text.replace("Zusammenfassend ist es wichtig", "Wichtig ist", 1)
    
    # Strip quotes
    quote_text = re.sub(r'^[„"\'\s]+|[“"\'\s]+$', '', quote_text).strip()
    if len(quote_text) < 35:
        continue
    if not re.search(r'[.!?]$', quote_text):
        quote_text += '.'
        
    lower = quote_text.lower()
    words_set = set(lower.split())
    if any(w in words_set for w in ['the', 'and', 'with', 'your', 'about']) and not any(w in words_set for w in ['der', 'die', 'das', 'und', 'ist', 'von', 'mit', 'auf', 'in', 'ein', 'eine']):
        continue
        
    url = item.get('url', 'https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/')
    topics = item.get('topics', [])
    
    # Generate keywords for matching
    text_clean = re.sub(r'[^\w\säöüÄÖÜß-]', ' ', quote_text.lower())
    words = [w for w in text_clean.split() if len(w) > 3]
    
    quote_pool.append({
        "id": f"li_{quote_id}",
        "type": "linkedin",
        "quote": quote_text,
        "sourceUrl": url,
        "sourceTitle": "LinkedIn-Beitrag von Jörg Zimmer",
        "topics": topics,
        "keywords": list(set(words)),
        "length": len(quote_text)
    })
    quote_id += 1

print(f"Loaded {len(quote_pool)} clean LinkedIn quotes.")

# 2. Process YouTube Spoken Quotes
yt_video_labels = {
    "tD7cXuVcRPA": "YouTube Never Code Alone",
    "ZIFCXUXypSc": "YouTube Talk Antonio Blago & Jörg Zimmer",
    "pJFZzv5LEvk": "YouTube Talk Antonio Blago & Jörg Zimmer Folge 5",
    "dVGOMAVUNQk": "YouTube SEOPresso",
    "32YkPQtOJDU": "YouTube Magic Writing Podcast"
}

# Words/phrases to filter out (host questions or filler turns)
host_intros = [
    "herzlich willkommen", "in dieser episode", "mein name ist", 
    "unser heutiger gast", "schön dass du da bist", "kurz schon vorgestellt",
    "meine zuhörer", "ich habe dich ja kurz", "hallo und herzlich"
]

yt_count = 0
for item in youtube_raw:
    text = item.get('text', '').strip()
    # Strip quotes
    text = re.sub(r'^[„"\'\s]+|[“"\'\s]+$', '', text).strip()
    
    # Check length: between 65 and 460 chars is ideal for a quote box
    if len(text) < 65 or len(text) > 460:
        continue
        
    # Capitalize first letter
    text = text[0].upper() + text[1:]
    # Ensure ending punctuation
    if not re.search(r'[.!?]$', text):
        text += '.'
        
    lower = text.lower()
    # Filter out English quotes
    words_set = set(lower.split())
    if any(w in words_set for w in ['the', 'and', 'with', 'your', 'about']) and not any(w in words_set for w in ['der', 'die', 'das', 'und', 'ist', 'von', 'mit', 'auf', 'in', 'ein', 'eine']):
        continue

    if any(hi in lower for hi in host_intros):
        continue
    if lower.startswith("frage an dich") or lower.startswith("was sagst du") or lower.startswith("erzähl mal") or lower.startswith("kurz mal"):
        continue
        
    vid = item.get('videoId')
    label = yt_video_labels.get(vid, "YouTube Interview")
    ts = item.get('timestamp', '00:00')
    source_title = f"{label} ({ts})"
    source_url = item.get('url', f"https://www.youtube.com/watch?v={vid}")
    topics = item.get('topics', [])
    
    text_clean = re.sub(r'[^\w\säöüÄÖÜß-]', ' ', text.lower())
    words = [w for w in text_clean.split() if len(w) > 3]
    
    quote_pool.append({
        "id": f"yt_{item.get('id', quote_id)}",
        "type": "youtube",
        "quote": text,
        "sourceUrl": source_url,
        "sourceTitle": source_title,
        "topics": topics,
        "keywords": list(set(words)),
        "length": len(text)
    })
    yt_count += 1

print(f"Loaded {yt_count} curated YouTube spoken quotes.")
print(f"Total curated quote pool: {len(quote_pool)} 100% verbatim quotes.")

out_path = 'scripts/data/quote-pool.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(quote_pool, f, ensure_ascii=False, indent=2)

print(f"Saved to {out_path}")
