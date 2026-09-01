const { spawn } = require('child_process');

const proc = spawn('npx', ['mcp-remote', 'https://api.seranking.com/mcp'], {
    stdio: ['pipe', 'pipe', 'inherit']
});

let buffer = '';

proc.stdout.on('data', (data) => {
    buffer += data.toString();
    console.log("STDOUT:", data.toString());
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

setTimeout(() => {
    const listToolsMessage = {
        jsonrpc: "2.0",
        id: 2,
        method: "tools/list",
        params: {}
    };
    proc.stdin.write(JSON.stringify(listToolsMessage) + '\n');
}, 1000);
