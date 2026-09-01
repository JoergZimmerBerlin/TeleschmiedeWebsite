import json
import os

config_path = os.path.expanduser('~/.gemini/config/mcp.json')

with open(config_path, 'r') as f:
    config = json.load(f)

if 'mcpServers' not in config:
    config['mcpServers'] = {}

config['mcpServers']['se-ranking'] = {
    "command": "npx",
    "args": [
        "-y",
        "mcp-remote",
        "https://api.seranking.com/mcp"
    ],
    "env": {
        "AUTHORIZATION": "Bearer 0f4da4ef-565c-4962-bc3f-5b25a6fec9d0"
    }
}

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("SUCCESS: se-ranking added with env token.")
