import os
import time
import urllib.request
import ssl
import requests
from youtube_transcript_api import YouTubeTranscriptApi

ssl._create_default_https_context = ssl._create_unverified_context

video_ids = ['tD7cXuVcRPA', 'ZIFCXUXypSc', 'dVGOMAVUNQk', '32YkPQtOJDU']
out_dir = 'src/assets/images/youtube'

os.makedirs(out_dir, exist_ok=True)
os.makedirs('src/data/transcripts', exist_ok=True)

# create a session that doesn't verify SSL
session = requests.Session()
session.verify = False

ytt_api = YouTubeTranscriptApi(http_client=session)

for vid in video_ids:
    print(f"Processing {vid}...")
    
    # Fetch thumbnail
    thumb_url = f"https://i.ytimg.com/vi/{vid}/maxresdefault.jpg"
    thumb_path = os.path.join(out_dir, f"{vid}.jpg")
    
    try:
        urllib.request.urlretrieve(thumb_url, thumb_path)
        print(f"Downloaded thumbnail for {vid}")
    except Exception as e:
        print(f"Failed to download maxres thumbnail for {vid}: {e}")
        try:
            thumb_url = f"https://i.ytimg.com/vi/{vid}/hqdefault.jpg"
            urllib.request.urlretrieve(thumb_url, thumb_path)
            print(f"Downloaded hqdefault thumbnail for {vid}")
        except Exception as e:
            print(f"Failed fallback thumbnail: {e}")

    # Fetch transcript
    try:
        transcript_list = ytt_api.list(vid)
        # Try to find DE or EN
        try:
            t = transcript_list.find_transcript(['de', 'en'])
        except Exception:
            # fallback to any available
            t = transcript_list.find_generated_transcript(['de', 'en'])
        
        transcript_data = t.fetch()
        transcript_text = ' '.join([x['text'] for x in transcript_data])
        
        with open(f"src/data/transcripts/{vid}.txt", "w", encoding="utf-8") as f:
            f.write(transcript_text)
        print(f"Saved transcript for {vid}")
    except Exception as e:
        print(f"Failed to get transcript for {vid}: {e}")
    
    print("Waiting 10 seconds to avoid blocks...")
    time.sleep(10)

print("Done!")
