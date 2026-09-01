import json
import os

config_path = os.path.expanduser('~/.gemini/config/mcp.json')

with open(config_path, 'r') as f:
    config = json.load(f)

if 'se-ranking' in config.get('mcpServers', {}):
    se_ranking = config['mcpServers']['se-ranking']
    se_ranking['command'] = "/Users/jorti/.nvm/versions/node/v22.22.2/bin/npx"
    se_ranking['args'] = [
        "mcp-remote",
        "https://api.seranking.com/mcp",
        "--header",
        "Authorization: Bearer 0f4da4ef-565c-4962-bc3f-5b25a6fec9d0"
    ]

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("SUCCESS: mcp.json updated with absolute path to npx.")
