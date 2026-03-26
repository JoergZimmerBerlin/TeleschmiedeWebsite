import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const LOG_DIR = process.env.LOG_DIR || path.join(__dirname, '../logs');
const DATA_FILE = path.join(__dirname, '../data/bot-stats.json');
const TEMPLATE_FILE = path.join(__dirname, 'templates/log-dashboard-template.html');
const OUTPUT_FILE = path.join(__dirname, '../dist/admin/logs/index.html');

const BOT_CATEGORIES = {
  seo: [
    { name: 'Googlebot', pattern: /Googlebot/i },
    { name: 'Bingbot', pattern: /bingbot/i },
    { name: 'YandexBot', pattern: /YandexBot/i },
    { name: 'Baiduspider', pattern: /Baiduspider/i },
    { name: 'DuckDuckBot', pattern: /DuckDuckBot/i },
  ],
  ai_training: [
    { name: 'GPTBot', pattern: /GPTBot/i },
    { name: 'ClaudeBot', pattern: /ClaudeBot/i },
    { name: 'CCBot', pattern: /CCBot/i },
    { name: 'Meta-ExternalAgent', pattern: /Meta-ExternalAgent/i },
    { name: 'Amazonbot', pattern: /Amazonbot/i },
    { name: 'CrawlSitemapCo', pattern: /CrawlSitemapCo/i },
    { name: 'AI2Bot', pattern: /AI2Bot/i },
  ],
  ai_grounding: [
    { name: 'ChatGPT-User', pattern: /ChatGPT-User/i },
    { name: 'OAI-SearchBot', pattern: /OAI-SearchBot/i },
    { name: 'PerplexityBot', pattern: /PerplexityBot/i },
    { name: 'BingPreview', pattern: /BingPreview/i },
    { name: 'Applebot-Extended', pattern: /Applebot-Extended/i },
  ],
};

async function parseLogFile(filePath) {
  const stats = {};
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  // Apache Combined Log Format regex
  const logRegex = /^(\S+) (\S+) (\S+) \[(.*?)\] "(.*?)" (\d{3}) (\S+) "(.*?)" "(.*?)"/;

  for await (const line of rl) {
    const match = line.match(logRegex);
    if (!match) continue;

    const [,, , , timestamp, request, status, , , userAgent] = match;
    const date = timestamp.split(':')[0]; // DD/MMM/YYYY

    if (!stats[date]) {
      stats[date] = {
        total: 0,
        categories: { seo: 0, ai_training: 0, ai_grounding: 0, other: 0 },
        bots: {}
      };
    }

    stats[date].total++;
    let found = false;

    for (const [catName, bots] of Object.entries(BOT_CATEGORIES)) {
      for (const bot of bots) {
        if (bot.pattern.test(userAgent)) {
          stats[date].categories[catName]++;
          stats[date].bots[bot.name] = (stats[date].bots[bot.name] || 0) + 1;
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      stats[date].categories.other++;
    }
  }

  return stats;
}

function mergeStats(current, newData) {
  for (const [date, data] of Object.entries(newData)) {
    if (!current[date]) {
      current[date] = data;
    } else {
      current[date].total += data.total;
      for (const cat of Object.keys(data.categories)) {
        current[date].categories[cat] += data.categories[cat];
      }
      for (const [bot, count] of Object.entries(data.bots)) {
        current[date].bots[bot] = (current[date].bots[bot] || 0) + count;
      }
    }
  }
}

async function run() {
  const args = process.argv.slice(2);
  const mode = args[0] || '--all';

  console.log(`--- Starting Log Analysis [Mode: ${mode}] ---`);

  if (mode === '--parse' || mode === '--all') {
    if (!fs.existsSync(LOG_DIR)) {
      console.error(`Log directory not found: ${LOG_DIR}`);
      if (mode === '--all') {
        console.log('Continuing to generation using existing data...');
      } else {
        process.exit(1);
      }
    } else {
      const files = fs.readdirSync(LOG_DIR).filter(f => f.includes('access.log'));
      let allNewStats = {};

      for (const file of files) {
        console.log(`Parsing ${file}...`);
        const fileStats = await parseLogFile(path.join(LOG_DIR, file));
        mergeStats(allNewStats, fileStats);
      }

      // Load history
      let history = {};
      if (fs.existsSync(DATA_FILE)) {
        history = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      }

      mergeStats(history, allNewStats);

      // Ensure data dir exists
      if (!fs.existsSync(path.dirname(DATA_FILE))) {
        fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      }

      fs.writeFileSync(DATA_FILE, JSON.stringify(history, null, 2));
      console.log(`Saved stats to ${DATA_FILE}`);
    }
  }

  if (mode === '--generate' || mode === '--all') {
    if (fs.existsSync(DATA_FILE)) {
      const history = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      await generateDashboard(history);
    } else {
      console.warn(`No data file found at ${DATA_FILE}. Skipping generation.`);
    }
  }
}

async function generateDashboard(data) {
  if (!fs.existsSync(TEMPLATE_FILE)) {
    console.warn('Dashboard template not found. Skipping generation.');
    return;
  }

  let template = fs.readFileSync(TEMPLATE_FILE, 'utf8');

  // Simple placeholder replacement
  const jsonData = JSON.stringify(data);
  const updatedTemplate = template.replace('{{BOT_DATA}}', jsonData);

  if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, updatedTemplate);
  console.log(`Generated dashboard at ${OUTPUT_FILE}`);
}

run().catch(console.error);
