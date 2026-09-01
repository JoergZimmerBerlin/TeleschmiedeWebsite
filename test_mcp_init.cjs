const { spawn } = require('child_process');

const proc = spawn('npx', ['mcp-remote', 'https://api.seranking.com/mcp'], {
    stdio: ['pipe', 'pipe', 'inherit']
});

let buffer = '';

proc.stdout.on('data', (data) => {
    buffer += data.toString();
    console.log("STDOUT:", data.toString());
});

proc.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

const initMessage = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
            name: "antigravity",
            version: "1.0.0"
        }
    }
};

proc.stdin.write(JSON.stringify(initMessage) + '\n');
console.log("Sent initialize message");
