import json
import os

config_path = os.path.expanduser('~/.gemini/config/mcp.json')

try:
    with open(config_path, 'r') as f:
        config = json.load(f)

    if 'se-ranking' in config.get('mcpServers', {}):
        se_ranking = config['mcpServers']['se-ranking']
        if 'args' in se_ranking:
            # We want to remove the explicit token headers
            se_ranking['args'] = [arg for arg in se_ranking['args'] if not arg.startswith('Authorization: Token') and arg != '--header']
        if 'env' in se_ranking and 'AUTHORIZATION' in se_ranking['env']:
            del se_ranking['env']['AUTHORIZATION']
            if not se_ranking['env']:
                del se_ranking['env']

    with open(config_path, 'w') as f:
        json.dump(config, f, indent=2)

    print("SUCCESS: mcp.json updated.")
except Exception as e:
    print(f"ERROR: {e}")
