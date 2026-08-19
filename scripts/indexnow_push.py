import sys
import urllib.request
import json

if len(sys.argv) < 2:
    sys.exit(1)

payload_str = sys.argv[1]

req = urllib.request.Request('https://api.indexnow.org/indexnow', data=payload_str.encode('utf-8'))
req.add_header('Content-Type', 'application/json; charset=utf-8')
try:
    with urllib.request.urlopen(req) as response:
        print(response.status)
except urllib.error.HTTPError as e:
    print(e.code)
except Exception as e:
    print('error')
