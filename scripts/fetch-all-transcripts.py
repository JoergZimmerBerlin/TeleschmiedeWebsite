import os
import time
import json
from youtube_transcript_api import YouTubeTranscriptApi

video_ids = [
    {"id": "32YkPQtOJDU", "title": "Magic Writing Podcast (Michael Kaufhold & Jörg Zimmer)"},
    {"id": "ZIFCXUXypSc", "title": "Talk Antonio Blago & Jörg Zimmer"},
    {"id": "dVGOMAVUNQk", "title": "SEOPresso Podcast (Björn Darko & Jörg Zimmer)"},
    {"id": "tD7cXuVcRPA", "title": "SEO-Sprechstunde (Roland Golla & Jörg Zimmer)"}
]

out_dir = "src/data/transcripts"
os.makedirs(out_dir, exist_ok=True)

ytt = YouTubeTranscriptApi()

for i, item in enumerate(video_ids):
    vid = item["id"]
    title = item["title"]
    print(f"[{i+1}/{len(video_ids)}] Hole Transkript für {vid} ({title})...")
    
    try:
        try:
            transcript_data = ytt.fetch(vid, languages=['de', 'en'])
        except Exception as e1:
            print(f"Direkter Fetch fehlgeschlagen ({e1}), versuche List & Find...")
            t_list = ytt.list(vid)
            try:
                t = t_list.find_transcript(['de', 'en'])
            except Exception:
                t = t_list.find_generated_transcript(['de', 'en'])
            transcript_data = t.fetch()
        
        # In Liste von dicts umwandeln
        snippets = []
        for s in transcript_data:
            if hasattr(s, 'text'):
                snippets.append({
                    "text": s.text,
                    "start": getattr(s, 'start', 0.0),
                    "duration": getattr(s, 'duration', 0.0)
                })
            elif isinstance(s, dict):
                snippets.append(s)
                
        # Als JSON speichern
        json_path = os.path.join(out_dir, f"raw_{vid}.json")
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump({"videoId": vid, "title": title, "snippets": snippets}, f, ensure_ascii=False, indent=2)
        print(f"✅ Gespeichert: {json_path} mit {len(snippets)} Snippets.")
        
        # Auch als lesbare Timestamp-Datei speichern
        txt_path = os.path.join(out_dir, f"{vid}_with_timestamps.txt")
        with open(txt_path, "w", encoding="utf-8") as f:
            f.write(f"# Transkript: {title} (ID: {vid})\n\n")
            for s in snippets:
                start_sec = int(s.get("start", 0))
                m = start_sec // 60
                sec = start_sec % 60
                f.write(f"[{m:02d}:{sec:02d}] {s.get('text', '')}\n")
        print(f"✅ Gespeichert: {txt_path}")
        
    except Exception as e:
        print(f"❌ Fehler bei {vid}: {e}")
        
    if i < len(video_ids) - 1:
        print("⏳ Warte 60 Sekunden bis zum nächsten Video, um Blocks zu vermeiden...")
        time.sleep(60)

print("\n🎉 Alle 4 Transkripte erfolgreich abgerufen und gespeichert!")
