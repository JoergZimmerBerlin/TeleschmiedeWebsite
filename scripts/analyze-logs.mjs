import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CONFIGURATION
const LOG_FILE = '/var/log/apache2/access.log'; // Path to production logs
const STATS_FILE = path.join(__dirname, '../data/bot-stats.json');
const TEMPLATE_FILE = path.join(__dirname, 'templates/log-dashboard-template.html');
const OUTPUT_FILE = path.join(__dirname, '../dist/admin/logs/index.html');

const BOT_CATEGORIES = {
  seo_classic: { label: 'SEO Classic', color: '#58a6ff' },
  ai_assistant: { label: 'Assistenten', color: '#3fb950' }, // ChatGPT-User, Claude-User etc.
  geo_search: { label: 'GEO / KI-Suche', color: '#bc8cff' }, // OAI-SearchBot, PerplexityBot etc.
  ai_training: { label: 'AI Training', color: '#8b949e' },   // GPTBot, ClaudeBot etc.
  ai_grounding: { label: 'KI-Grounding', color: '#ff7b72' }   // RAG / Inference Bots
};

const BOT_LIST = [
  // 1. Classic Search Engines
  { pattern: /Googlebot/i, name: 'Googlebot', provider: 'Google', purpose: 'Standard Indexierung', category: 'seo_classic' },
  { pattern: /Bingbot/i, name: 'Bingbot', provider: 'Microsoft', purpose: 'Standard Indexierung', category: 'seo_classic' },
  // 2. AI Assistants (Real-time Citations & Live Fetch)
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User', provider: 'OpenAI', purpose: 'Citation / Browsing', category: 'ai_assistant' },
  { pattern: /Claude-User|Claude-Web/i, name: 'Claude-User', provider: 'Anthropic', purpose: 'Citation / Browsing', category: 'ai_assistant' },
  { pattern: /Perplexity-User/i, name: 'Perplexity-User', provider: 'Perplexity', purpose: 'Citation / Browsing', category: 'ai_assistant' },
  // 3. GEO / AI Search Engines (Indexing for Generative Answers)
  { pattern: /OAI-SearchBot/i, name: 'OAI-SearchBot', provider: 'OpenAI', purpose: 'Search Index (GEO)', category: 'geo_search' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot', provider: 'Perplexity', purpose: 'Search Index (GEO)', category: 'geo_search' },
  { pattern: /Google-Other/i, name: 'Google-Other', provider: 'Google', purpose: 'Search/Discover (GEO)', category: 'geo_search' },
  // 4. Grounding & RAG
  { pattern: /BingPreview/i, name: 'BingPreview', provider: 'Microsoft', purpose: 'Grounding (RAG)', category: 'ai_grounding' },
  { pattern: /Amazonbot/i, name: 'Amazonbot', provider: 'Amazon', purpose: 'RAG / Shopping', category: 'ai_grounding' },
  // 5. AI Model Training (High Precedence: Check Extended variants BEFORE base crawlers)
  { pattern: /Applebot-Extended/i, name: 'Applebot-Extended', provider: 'Apple', purpose: 'Apple Intelligence Training', category: 'ai_training' },
  { pattern: /Applebot/i, name: 'Applebot', provider: 'Apple', purpose: 'Apple Intelligence & Siri', category: 'geo_search' },
  { pattern: /Google-Extended/i, name: 'Google-Extended', provider: 'Google', purpose: 'Gemini AI Training', category: 'ai_training' },
  { pattern: /GPTBot/i, name: 'GPTBot', provider: 'OpenAI', purpose: 'Training', category: 'ai_training' },
  { pattern: /ClaudeBot/i, name: 'ClaudeBot', provider: 'Anthropic', purpose: 'Training', category: 'ai_training' },
  { pattern: /Meta-ExternalAgent/i, name: 'Meta-ExternalAgent', provider: 'Meta', purpose: 'Meta AI Training', category: 'ai_training' },
  { pattern: /Bytespider/i, name: 'Bytespider', provider: 'ByteDance', purpose: 'Training & Search', category: 'ai_training' },
  { pattern: /CCBot/i, name: 'CCBot', provider: 'CommonCrawl', purpose: 'Training', category: 'ai_training' },
  { pattern: /cohere-ai/i, name: 'Cohere-AI', provider: 'Cohere', purpose: 'LLM Training', category: 'ai_training' },
  { pattern: /Diffbot/i, name: 'Diffbot', provider: 'Diffbot', purpose: 'Knowledge Graph', category: 'ai_training' }
];

function parseLogLine(line) {
  // Format: ip - - [dd/MMM/yyyy:HH:mm:ss +zzzz] "GET /url HTTP/1.1" 200 1234 "referer" "User-Agent"
  const match = line.match(/^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+) [^"]*" (\d+) \S+(?: "(?:[^"]*)" "([^"]*)")?/);
  if (!match) return null;
  const ua = match[6] || '';
  
  // Clean URL: strip query parameters and hash fragments
  let rawUrl = match[4] || '/';
  const cleanUrl = rawUrl.split('?')[0].split('#')[0] || '/';

  return { 
    date: match[2].split(':')[0], 
    url: cleanUrl, 
    status: parseInt(match[5]), 
    ua 
  };
}

async function analyzeLogs() {
  console.log("--- Starting 2026 AI/GEO Log Analysis ---");
  
  let stats = {};
  if (fs.existsSync(STATS_FILE)) {
    try {
      stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
    } catch (e) {
      console.warn("Notice: could not parse existing stats file, creating new structure.");
    }
  }

  // Ensure _meta exists
  if (!stats._meta) stats._meta = { total_ai_bots: BOT_LIST.length };
  stats._meta.last_updated = new Date().toISOString();
  stats._meta.total_ai_bots = BOT_LIST.length;

  // Determine which files to process
  const filesToProcess = [];
  const logDir = process.env.LOG_DIR;

  if (logDir && fs.existsSync(logDir)) {
    function scanDir(dir) {
      const dirFiles = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of dirFiles) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.isFile() && (entry.name.includes('access.log') || entry.name.endsWith('.log') || entry.name.endsWith('.gz'))) {
          filesToProcess.push(fullPath);
        }
      }
    }
    scanDir(logDir);
    console.log(`Found ${filesToProcess.length} log files in ${logDir}`);
  } else if (fs.existsSync(LOG_FILE)) {
    filesToProcess.push(LOG_FILE);
    console.log(`Processing single log file: ${LOG_FILE}`);
  }

  if (filesToProcess.length === 0) {
    console.log("No log files found. Skipping parsing, using existing stats.");
  } else {
    // Collect daily stats fresh for all parsed dates to prevent duplication
    const parsedDays = {};

    filesToProcess.forEach(filePath => {
      console.log(`Parsing: ${path.basename(filePath)}`);
      let content = '';
      try {
        if (filePath.endsWith('.gz')) {
          content = zlib.gunzipSync(fs.readFileSync(filePath)).toString('utf8');
        } else {
          content = fs.readFileSync(filePath, 'utf8');
        }
      } catch (err) {
        console.error(`Error reading ${filePath}:`, err.message);
        return;
      }
      const lines = content.split('\n');
      let linesParsed = 0;
      
      lines.forEach(line => {
        const data = parseLogLine(line);
        if (!data) return;

        const bot = BOT_LIST.find(b => b.pattern.test(data.ua));
        if (!bot) return;

        linesParsed++;

        if (!parsedDays[data.date]) {
          parsedDays[data.date] = { 
            total: 0, 
            categories: {}, 
            bots: {}, 
            pages: {}, 
            folders: {}, 
            errors: { total: 0, byCategory: {} } 
          };
        }

        const day = parsedDays[data.date];
        day.total++;
        day.categories[bot.category] = (day.categories[bot.category] || 0) + 1;

        // Folder analysis (e.g., /blog, /glossar, or root)
        const parts = data.url.split('/').filter(Boolean);
        const folder = (parts.length > 0 && !parts[0].includes('.')) ? `/${parts[0]}` : '/';
        
        if (!day.folders[folder]) day.folders[folder] = { count: 0, categories: {} };
        day.folders[folder].count++;
        day.folders[folder].categories[bot.category] = (day.folders[folder].categories[bot.category] || 0) + 1;

        if (!day.bots[bot.name]) {
          day.bots[bot.name] = { count: 0, provider: bot.provider, purpose: bot.purpose, category: bot.category, errors: 0 };
        }
        day.bots[bot.name].count++;
        day.bots[bot.name].lastSeen = data.date;

        if (!day.pages[data.url]) {
          day.pages[data.url] = { count: 0, errors: 0, uniqueBots: 0, _botSet: new Set(), categories: {} };
        }
        day.pages[data.url].count++;
        day.pages[data.url]._botSet.add(bot.name);
        day.pages[data.url].categories[bot.category] = (day.pages[data.url].categories[bot.category] || 0) + 1;

        if (data.status >= 400) {
          day.errors.total++;
          day.errors.byCategory[bot.category] = (day.errors.byCategory[bot.category] || 0) + 1;
          day.bots[bot.name].errors++;
          day.pages[data.url].errors++;
        }
      });
      console.log(`- Finished ${path.basename(filePath)}: ${linesParsed} lines relevant for AI analytics.`);
    });

    // Finalize uniqueBots and merge parsed days into stats
    Object.entries(parsedDays).forEach(([date, day]) => {
      Object.values(day.pages).forEach(page => {
        if (page._botSet) {
          page.uniqueBots = page._botSet.size;
          delete page._botSet;
        }
      });
      // Replace or update date with accurate fresh calculation
      stats[date] = day;
    });
  }

  fs.mkdirSync(path.dirname(STATS_FILE), { recursive: true });
  fs.writeFileSync(STATS_FILE, JSON.stringify(stats, null, 2));

  if (process.argv.includes('--generate')) {
    generateDashboard(stats);
  }
}

function generateDashboard(stats) {
  if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error("Template not found: " + TEMPLATE_FILE);
    return;
  }
  const template = fs.readFileSync(TEMPLATE_FILE, 'utf8');
  const finalHtml = template.replace(/\/\* {{BOT_DATA_JSON_STR}} \*\/ 'placeholder'/, JSON.stringify(stats));
  
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, finalHtml);
  console.log(`Generated dashboard at ${OUTPUT_FILE}`);
}

analyzeLogs();
