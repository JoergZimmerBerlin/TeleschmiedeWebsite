import sys
import urllib.request
import json
import ssl

if len(sys.argv) < 2:
    sys.exit(1)

url = sys.argv[1]

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    with urllib.request.urlopen(url, context=ctx) as response:
        print(response.read().decode())
except Exception as e:
    import traceback
    traceback.print_exc(file=sys.stderr)
    print('{"error": "fetch failed"}')
