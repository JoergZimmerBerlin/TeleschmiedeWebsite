import os
import urllib.request
import json
import csv
from datetime import datetime
import re

import os

# Dein API-Schlüssel sicher aus der JSON laden
CREDENTIALS_FILE = os.path.join(os.path.dirname(__file__), '..', 'bing-credentials.json')
with open(CREDENTIALS_FILE, 'r') as f:
    API_KEY = json.load(f).get("BING_WEBMASTER_API_KEY")

SITE_URL = "https://teleschmie.de/"

def parse_bing_date(date_str):
    """Konvertiert das komische Bing Date Format /Date(1234567890000)/ in ein lesbares Datum."""
    match = re.search(r'/Date\((\d+)[-\+]\d+\)/', date_str)
    if match:
        timestamp = int(match.group(1)) / 1000.0
        return datetime.fromtimestamp(timestamp).strftime('%Y-%m-%d')
    return date_str

def get_search_performance():
    print(f"Rufe Performance-Daten für {SITE_URL} ab...")
    
    # Endpunkt für die Keyword-Statistiken (GetQueryStats) oder URL-Statistiken (GetPageStats)
    url = f"https://ssl.bing.com/webmaster/api.svc/json/GetPageStats?siteUrl={SITE_URL}&apikey={API_KEY}"
    
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                results = data.get("d", [])
                
                if not results:
                    print("Keine Daten für diesen Zeitraum gefunden.")
                    return

                print(f"Erfolgreich {len(results)} Einträge geladen.")
                
                # Als CSV exportieren
                filename = "bing_performance_export.csv"
                with open(filename, mode='w', newline='', encoding='utf-8') as file:
                    writer = csv.writer(file)
                    writer.writerow(["Datum", "URL", "Klicks", "Impressionen", "Durchschn. Position"])
                    
                    for item in results:
                        date = parse_bing_date(item.get("Date", ""))
                        query = item.get("Query", "")
                        clicks = item.get("Clicks", 0)
                        impressions = item.get("Impressions", 0)
                        avg_pos = item.get("AvgImpressionPosition", 0)
                        
                        writer.writerow([date, query, clicks, impressions, avg_pos])
                        
                print(f"Die Daten wurden erfolgreich in die Datei '{filename}' exportiert!")
                
                # Preview der ersten 3 Einträge in der Konsole
                print("\nVorschau der ersten 3 Einträge:")
                for item in results[:3]:
                    print(f"- {item.get('Query', '')} ({item.get('Clicks')} Klicks, {item.get('Impressions')} Impr.)")
            else:
                print(f"Fehler bei der API-Anfrage. Status Code: {response.status}")
                
    except Exception as e:
        print(f"Ein Fehler ist aufgetreten: {e}")

if __name__ == "__main__":
    get_search_performance()
