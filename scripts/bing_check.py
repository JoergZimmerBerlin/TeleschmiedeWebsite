import sys
import urllib.request
import json

if len(sys.argv) < 2:
    sys.exit(1)

url = sys.argv[1]

try:
    with urllib.request.urlopen(url) as response:
        print(response.read().decode())
except Exception as e:
    print('{"error": "fetch failed"}')
