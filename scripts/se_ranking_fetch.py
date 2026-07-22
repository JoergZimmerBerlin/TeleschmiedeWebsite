import urllib.request
import json

api_key = "574575a4-998e-5891-bd07-e9ad694de7cf"
headers = {
    "Authorization": f"Token {api_key}",
    "Content-Type": "application/json"
}

def get_json(url):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.URLError as e:
        print(f"Error fetching {url}: {e}")
        if hasattr(e, 'read'):
            print(e.read().decode())
        return None

print("Fetching projects...")
projects = get_json("https://api.seranking.com/v1/project-management/sites")
if projects:
    teleschmie_project = None
    for p in projects:
        if 'teleschmie.de' in p.get('title', '').lower() or 'teleschmie.de' in p.get('url', '').lower():
            teleschmie_project = p
            break
            
    if teleschmie_project:
        print("Found teleschmie.de project:")
        print(json.dumps(teleschmie_project, indent=2))
        site_id = teleschmie_project.get('id')
        
        # Now fetch stats or audits for this site id
        print(f"\\nFetching audits for project ID {site_id}...")
        audits = get_json("https://api.seranking.com/v1/site-audit/audits")
        if audits:
            site_audits = [a for a in audits.get('items', []) if a.get('site_id') == site_id]
            print(f"Found {len(site_audits)} audits for this site.")
            for audit in site_audits:
                print(json.dumps(audit, indent=2))
                
                # Fetch detailed report if finished
                if audit.get('status') == 'finished':
                    audit_id = audit.get('id')
                    print(f"\\nFetching detailed report for audit {audit_id}...")
                    report = get_json(f"https://api.seranking.com/v1/site-audit/audits/report?audit_id={audit_id}")
                    if report:
                        print(json.dumps(report, indent=2))
    else:
        print("teleschmie.de not found in projects. Available projects:")
        for p in projects:
            print("-", p.get('title'), p.get('url'))
