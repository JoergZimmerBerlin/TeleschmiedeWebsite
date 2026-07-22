import urllib.request
import json
import os

api_key = "574575a4-998e-5891-bd07-e9ad694de7cf"
headers = {
    "Authorization": f"Token {api_key}",
    "Content-Type": "application/json"
}

site_id = 11695244
domain = "teleschmie.de"

def get_json(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        return {"error": str(e)}

dashboard = {}

print("Fetching summary...")
dashboard["summary"] = get_json(f"https://api.seranking.com/v1/project-management/sites/summary?site_id={site_id}")

print("Fetching backlinks...")
dashboard["backlinks"] = get_json(f"https://api.seranking.com/v1/backlinks/summary?target={domain}&mode=domain")

print("Fetching keyword positions...")
dashboard["positions"] = get_json(f"https://api.seranking.com/v1/project-management/sites/positions?site_id={site_id}")

print("Fetching audits...")
audits = get_json("https://api.seranking.com/v1/site-audit/audits")
if audits and "items" in audits:
    site_audits = [a for a in audits["items"] if a.get("site_id") == site_id]
    dashboard["audits"] = site_audits
else:
    dashboard["audits"] = audits

with open("/Users/jorti/Documents/Antigravity/scripts/teleschmie_se_ranking.json", "w") as f:
    json.dump(dashboard, f, indent=2)

print("Done. Saved to teleschmie_se_ranking.json")
