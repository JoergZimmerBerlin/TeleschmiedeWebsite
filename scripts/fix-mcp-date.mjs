import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mcpPath = path.join(__dirname, '..', 'src', 'content', 'glossar', 'model-context-protocol-mcp.md');
if (fs.existsSync(mcpPath)) {
  let content = fs.readFileSync(mcpPath, 'utf8');
  content = content.replace(/Im Juli 2026 wurde das Model/g, 'Im Juni 2026 wurde das Model');
  content = content.replace(/28\. Juli 2026/g, '28. Juni 2026');
  content = content.replace(/MCP-Update im Juli 2026/g, 'MCP-Update im Juni 2026');
  content = content.replace(/Sommer 2026/g, 'Frühsommer 2026');
  content = content.replace(/Juli-Update/g, 'Juni-Update');
  fs.writeFileSync(mcpPath, content, 'utf8');
  console.log('✅ Fixed dates in model-context-protocol-mcp.md');
}

const a2aPath = path.join(__dirname, '..', 'src', 'content', 'glossar', 'a2a-protocol.md');
if (fs.existsSync(a2aPath)) {
  let content = fs.readFileSync(a2aPath, 'utf8');
  content = content.replace(/Seit Juli 2026 ist dieser Standard zustandslos/g, 'Seit Juni 2026 ist dieser Standard zustandslos');
  fs.writeFileSync(a2aPath, content, 'utf8');
  console.log('✅ Fixed dates in a2a-protocol.md');
}
