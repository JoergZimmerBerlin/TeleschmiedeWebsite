import json
import os

config_path = os.path.expanduser('~/.gemini/config/mcp.json')

with open(config_path, 'r') as f:
    config = json.load(f)

if 'se-ranking' in config.get('mcpServers', {}):
    se_ranking = config['mcpServers']['se-ranking']
    se_ranking['command'] = "sh"
    se_ranking['args'] = [
        "-c",
        "mcp-remote https://api.seranking.com/mcp 2>/dev/null"
    ]
    if 'env' in se_ranking:
        del se_ranking['env']

with open(config_path, 'w') as f:
    json.dump(config, f, indent=2)

print("SUCCESS: mcp.json updated to use sh -c to suppress stderr.")
