import os
import json
import re

videos = [
    {
        "id": "32YkPQtOJDU",
        "title": "Magic Writing Podcast: Ist SEO tot?",
        "host": "Michael Kaufhold",
        "host_cues": ["magic writing", "michael", "unser gast", "meine zuhörer", "jürg", "jörg", "was hältst du", "wie siehst du", "erzähl mal", "hast du", "deine meinung", "copywriting"]
    },
    {
        "id": "ZIFCXUXypSc",
        "title": "Behind the scenes in Marketing: 20 Jahre SEO & SEA",
        "host": "Antonio Blago",
        "host_cues": ["behind the scenes", "antonio", "blago", "podcast", "jörg", "wie siehst du", "was sagst du", "erzähl mal", "deine kunden", "deiner meinung", "host antonio"]
    },
    {
        "id": "pJFZzv5LEvk",
        "title": "Folge 5: Was ist dran an AI SEO oder GEO? Mit SEO Experten Jörg Zimmer",
        "host": "Antonio Blago",
        "host_cues": ["behind the scenes", "antonio", "blago", "podcast zweiter teil", "jörg", "wie siehst du", "was sagst du", "erzähl mal", "deine kunden", "deiner meinung"]
    },
    {
        "id": "dVGOMAVUNQk",
        "title": "SEOPresso: SEO persönlich mit Jörg Zimmer",
        "host": "Björn Darko",
        "host_cues": ["seopresso", "björn", "darko", "seo persönlich", "moin jörg", "jörg zimmer ist", "dein interviewtag", "was hat dich", "kannst du uns", "wie war dein", "aus deiner laufbahn"]
    },
    {
        "id": "tD7cXuVcRPA",
        "title": "Never Code Alone: SEO-Sprechstunde Live",
        "host": "Roland Golla",
        "host_cues": ["never code alone", "roland", "golla", "software entertainment", "herzlich willkommen jörg", "woher kommst du", "wieso kannst du", "wie siehst du diesen", "was hältst du von", "php-training"]
    }
]

out_dir = "src/data/transcripts"
output_db = "src/data/joerg-youtube-transcripts.json"

all_joerg_segments = []

for v in videos:
    vid = v["id"]
    title = v["title"]
    host = v["host"]
    json_path = os.path.join(out_dir, f"raw_{vid}.json")
    
    if not os.path.exists(json_path):
        print(f"⚠️ Datei nicht gefunden: {json_path}")
        continue
        
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    snippets = data.get("snippets", [])
    
    # 1. Snippets in zusammenhängende, satzbasierte Sprechblöcke gruppieren
    blocks = []
    current_block = []
    current_start = 0.0
    
    for s in snippets:
        if not current_block:
            current_start = s["start"]
        text_piece = s["text"].replace("\n", " ").strip()
        current_block.append(text_piece)
        full_candidate = " ".join(current_block).strip()
        words = full_candidate.split()
        
        # Wechsle Block bei Satzende (Punkt, Ausrufezeichen, Fragezeichen) ab 25 Wörtern, oder spätestens bei 60 Wörtern
        has_punct = bool(re.search(r'[.!?]\s*$', full_candidate))
        if (len(words) >= 25 and has_punct) or len(words) >= 60:
            blocks.append({
                "start": current_start,
                "text": full_candidate
            })
            current_block = []
            
    if current_block:
        blocks.append({
            "start": current_start,
            "text": " ".join(current_block).strip()
        })
        
    # 2. Block-Klassifizierung: Host vs. Jörg
    joerg_blocks = []
    
    for b in blocks:
        text = b["text"]
        start_sec = int(b["start"])
        lower = text.lower()
        
        # Intro-Regel: Die ersten 40 Sekunden gehören meist dem Host
        is_host = False
        if start_sec < 40 and any(hc in lower for hc in v["host_cues"][:3]):
            is_host = True
        elif any(phrase in lower for phrase in ["frage an dich", "was sagst du", "wie siehst du", "erzähl mal", "was hältst du", "kurz mal fragen", "kurz noch mal einhaken"]):
            is_host = True
        elif len(text.split()) < 30 and ("jörg" in lower or "jürg" in lower):
            is_host = True
            
        # Jörg-Merkmale
        is_joerg = False
        if any(w in lower for w in ["ich ", "mein ", "meine ", "wir ", "für mich", "habe ich", "bin ich", "spandau", "kunden", "also ich"]):
            is_joerg = True
            
        # Wenn nicht eindeutig Host, ist es in diesen Interviews fast immer Jörg
        if not is_host or (is_joerg and len(text.split()) >= 25):
            m = start_sec // 60
            s = start_sec % 60
            ts_str = f"{m:02d}:{s:02d}"
            yt_url = f"https://www.youtube.com/watch?v={vid}&t={start_sec}s"
            
            # Themen-Tagging
            topics = []
            if any(k in lower for k in ["ki", "ai", "chatgpt", "gemini", "geo", "perplexity", "llm"]):
                topics.append("KI & Generative Search")
            if any(k in lower for k in ["relaunch", "redirect", "301", "weiterleit", "404"]):
                topics.append("Relaunch & Redirects")
            if any(k in lower for k in ["pagespeed", "ladezeit", "mobile", "design", "ux"]):
                topics.append("Webdesign & UX")
            if any(k in lower for k in ["ads", "sea", "budget", "kampagne"]):
                topics.append("Google Ads & SEA")
            if any(k in lower for k in ["freelance", "kunden", "agentur", "beratung", "sprechstunde"]):
                topics.append("Freelancer & Beratung")
            if any(k in lower for k in ["google", "search console", "index", "crawler", "ranking"]):
                topics.append("Technisches SEO & Indexierung")
            if not topics:
                topics.append("Allgemeine SEO Philosophie")
                
            entry = {
                "id": f"{vid}_{start_sec}",
                "videoId": vid,
                "videoTitle": title,
                "host": host,
                "timestamp": ts_str,
                "startSeconds": start_sec,
                "url": yt_url,
                "speaker": "Jörg Zimmer",
                "text": text,
                "topics": topics
            }
            joerg_blocks.append(entry)
            all_joerg_segments.append(entry)
            
    # Speichere joerg_only Textdatei für jedes Video
    out_txt = os.path.join(out_dir, f"{vid}_joerg_only.txt")
    with open(out_txt, "w", encoding="utf-8") as f:
        f.write(f"# Jörg Zimmer O-Töne aus: {title} (Host: {host})\n")
        f.write(f"# Video URL: https://www.youtube.com/watch?v={vid}\n\n")
        for jb in joerg_blocks:
            f.write(f"[{jb['timestamp']}] ({jb['url']})\n{jb['text']}\n\n")
            
    print(f"✅ {vid}: {len(joerg_blocks)} Jörg-Segmente extrahiert -> {out_txt}")

# Speichere die Gesamtdatenbank als JSON
with open(output_db, "w", encoding="utf-8") as f:
    json.dump(all_joerg_segments, f, ensure_ascii=False, indent=2)

print(f"\n🎉 Gesamte YouTube-Transkript-Datenbank gespeichert:")
print(f"📁 {output_db} mit insgesamt {len(all_joerg_segments)} echten Jörg-Segmenten!")
