import os
import time
import urllib.request
from youtube_transcript_api import YouTubeTranscriptApi

video_ids = ['tD7cXuVcRPA', 'ZIFCXUXypSc', 'dVGOMAVUNQk', '32YkPQtOJDU']
out_dir = 'src/assets/images/youtube'

os.makedirs(out_dir, exist_ok=True)
os.makedirs('src/data/transcripts', exist_ok=True)

for vid in video_ids:
    print(f"Processing {vid}...")
    # Fetch thumbnail
    thumb_url = f"https://i.ytimg.com/vi/{vid}/maxresdefault.jpg"
    thumb_path = os.path.join(out_dir, f"{vid}.jpg")
    
    try:
        urllib.request.urlretrieve(thumb_url, thumb_path)
        print(f"Downloaded thumbnail for {vid}")
    except Exception as e:
        print(f"Failed to download thumbnail for {vid}: {e}")
        # fallback to mqdefault
        try:
            thumb_url = f"https://i.ytimg.com/vi/{vid}/mqdefault.jpg"
            urllib.request.urlretrieve(thumb_url, thumb_path)
        except Exception as e:
            print(f"Failed fallback thumbnail: {e}")

    # Fetch transcript
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(vid, languages=['de', 'en'])
        transcript_text = ' '.join([t['text'] for t in transcript_list])
        
        with open(f"src/data/transcripts/{vid}.txt", "w", encoding="utf-8") as f:
            f.write(transcript_text)
        print(f"Saved transcript for {vid}")
    except Exception as e:
        print(f"Failed to get transcript for {vid}: {e}")
    
    print("Waiting 60 seconds to avoid blocks...")
    time.sleep(60)

print("Done!")
