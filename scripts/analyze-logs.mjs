import fs from 'fs';
import path from 'path';
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
  { pattern: /Googlebot/i, name: 'Googlebot', provider: 'Google', purpose: 'Standard Indexierung', category: 'seo_classic' },
  { pattern: /Bingbot/i, name: 'Bingbot', provider: 'Microsoft', purpose: 'Standard Indexierung', category: 'seo_classic' },
  // AI Assistants (Real-time Citations)
  { pattern: /ChatGPT-User/i, name: 'ChatGPT-User', provider: 'OpenAI', purpose: 'Citation / Browsing', category: 'ai_assistant' },
  { pattern: /Claude-User/i, name: 'Claude-User', provider: 'Anthropic', purpose: 'Citation / Browsing', category: 'ai_assistant' },
  { pattern: /Perplexity-User/i, name: 'Perplexity-User', provider: 'Perplexity', purpose: 'Citation / Browsing', category: 'ai_assistant' },
  // GEO / KI-Suche (Indexing for AI Answers)
  { pattern: /OAI-SearchBot/i, name: 'OAI-SearchBot', provider: 'OpenAI', purpose: 'Search Index (GEO)', category: 'geo_search' },
  { pattern: /PerplexityBot/i, name: 'PerplexityBot', provider: 'Perplexity', purpose: 'Search Index (GEO)', category: 'geo_search' },
  { pattern: /Google-Other/i, name: 'Google-Other', provider: 'Google', purpose: 'Search/Discover (GEO)', category: 'geo_search' },
  // KI-Grounding / RAG
  { pattern: /BingPreview/i, name: 'BingPreview', provider: 'Microsoft', purpose: 'Grounding (RAG)', category: 'ai_grounding' },
  { pattern: /Amazonbot/i, name: 'Amazonbot', provider: 'Amazon', purpose: 'RAG / Shopping', category: 'ai_grounding' },
  // AI Training
  { pattern: /GPTBot/i, name: 'GPTBot', provider: 'OpenAI', purpose: 'Training', category: 'ai_training' },
  { pattern: /ClaudeBot/i, name: 'ClaudeBot', provider: 'Anthropic', purpose: 'Training', category: 'ai_training' },
  { pattern: /CCBot/i, name: 'CCBot', provider: 'CommonCrawl', purpose: 'Training', category: 'ai_training' }
];

function parseLogLine(line) {
  // Format: ip - - [dd/MMM/yyyy:HH:mm:ss +zzzz] "GET /url HTTP/1.1" 200 ... "User-Agent"
  const match = line.match(/^(\S+) \S+ \S+ \[([^\]]+)\] "(\S+) (\S+) \S+" (\d+) \d+ "[^"]*" "([^"]*)"/);
  if (!match) return null;
  return { date: match[2].split(':')[0], url: match[4], status: parseInt(match[5]), ua: match[6] };
}

async function analyzeLogs() {
  console.log("--- Starting 2026 AI/GEO Log Analysis ---");
  
  let stats = {};
  if (fs.existsSync(STATS_FILE)) {
    stats = JSON.parse(fs.readFileSync(STATS_FILE, 'utf8'));
  }

  // Ensure _meta exists
  if (!stats._meta) stats._meta = { total_ai_bots: BOT_LIST.length };
  stats._meta.last_updated = new Date().toISOString();

  // For simulation/dev (if log doesn't exist)
  if (!fs.existsSync(LOG_FILE)) {
    console.log("Log file not found. Skipping parsing, using existing stats.");
  } else {
    const lines = fs.readFileSync(LOG_FILE, 'utf8').split('\n');
    lines.forEach(line => {
      const data = parseLogLine(line);
      if (!data) return;

      const bot = BOT_LIST.find(b => b.pattern.test(data.ua));
      if (!bot) return;

      if (!stats[data.date]) {
        stats[data.date] = { total: 0, categories: {}, bots: {}, pages: {}, folders: {}, errors: { total: 0, byCategory: {} } };
      }

      const day = stats[data.date];
      day.total++;
      day.categories[bot.category] = (day.categories[bot.category] || 0) + 1;

      // Folder analysis (e.g., /blog, /glossar)
      const folder = data.url.split('/')[1] ? `/${data.url.split('/')[1]}` : '/';
      if (!day.folders[folder]) day.folders[folder] = { count: 0, categories: {} };
      day.folders[folder].count++;
      day.folders[folder].categories[bot.category] = (day.folders[folder].categories[bot.category] || 0) + 1;

      if (!day.bots[bot.name]) {
        day.bots[bot.name] = { count: 0, provider: bot.provider, purpose: bot.purpose, category: bot.category, errors: 0 };
      }
      day.bots[bot.name].count++;
      day.bots[bot.name].lastSeen = data.date;

      if (!day.pages[data.url]) {
        day.pages[data.url] = { count: 0, errors: 0, bots: new Set(), categories: {} };
      }
      day.pages[data.url].count++;
      day.pages[data.url].bots.add(bot.name);
      day.pages[data.url].categories[bot.category] = (day.pages[data.url].categories[bot.category] || 0) + 1;

      if (data.status >= 400) {
        day.errors.total++;
        day.errors.byCategory[bot.category] = (day.errors.byCategory[bot.category] || 0) + 1;
        day.bots[bot.name].errors++;
        day.pages[data.url].errors++;
      }
    });

    // Post-process sets to counts
    Object.values(stats).forEach(day => {
      if (day.pages) {
        Object.values(day.pages).forEach(page => {
          if (page.bots instanceof Set) {
            page.uniqueBots = page.bots.size;
            // No delete page.bots if we want to know exact bots? 
            // But let's keep it clean for now and use categories.
            delete page.bots;
          }
        });
      }
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
