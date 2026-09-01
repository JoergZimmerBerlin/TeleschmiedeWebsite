const { spawn } = require('child_process');

const proc = spawn('npx', ['mcp-remote', 'https://api.seranking.com/mcp'], {
    stdio: ['pipe', 'pipe', 'inherit']
});

let buffer = '';

proc.stdout.on('data', (data) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop();
    
    for (const line of lines) {
        if (!line.trim()) continue;
        try {
            const msg = JSON.parse(line);
            if (msg.id === 1) {
                const callToolMsg = {
                    jsonrpc: "2.0",
                    id: 3,
                    method: "tools/call",
                    params: {
                        name: "PROJECT_listProjects",
                        arguments: {}
                    }
                };
                proc.stdin.write(JSON.stringify(callToolMsg) + '\n');
            } else if (msg.id === 3) {
                console.log("PROJECTS_DATA:", JSON.stringify(msg.result, null, 2));
                proc.kill();
                process.exit(0);
            }
        } catch (e) {}
    }
});

const initMessage = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: { name: "test", version: "1" }
    }
};

proc.stdin.write(JSON.stringify(initMessage) + '\n');
