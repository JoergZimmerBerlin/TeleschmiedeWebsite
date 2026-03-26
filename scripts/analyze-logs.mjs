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
  seo: {
    label: 'Suchmaschinen',
    bots: [
      { name: 'Googlebot', pattern: /Googlebot/i, company: 'Google', purpose: 'Indexierung' },
      { name: 'Bingbot', pattern: /bingbot/i, company: 'Microsoft', purpose: 'Indexierung' },
      { name: 'YandexBot', pattern: /YandexBot/i, company: 'Yandex', purpose: 'Indexierung' },
      { name: 'Baiduspider', pattern: /Baiduspider/i, company: 'Baidu', purpose: 'Indexierung' },
      { name: 'DuckDuckBot', pattern: /DuckDuckBot/i, company: 'DuckDuckGo', purpose: 'Indexierung' },
    ]
  },
  ai_training: {
    label: 'AI-Training',
    bots: [
      { name: 'GPTBot', pattern: /GPTBot/i, company: 'OpenAI', purpose: 'Training' },
      { name: 'ClaudeBot', pattern: /ClaudeBot/i, company: 'Anthropic', purpose: 'Training' },
      { name: 'CCBot', pattern: /CCBot/i, company: 'Common Crawl', purpose: 'Dataset' },
      { name: 'Meta-ExternalAgent', pattern: /Meta-ExternalAgent/i, company: 'Meta', purpose: 'Training' },
      { name: 'Amazonbot', pattern: /Amazonbot/i, company: 'Amazon', purpose: 'Training' },
    ]
  },
  ai_search: {
    label: 'AI-Suche',
    bots: [
      { name: 'PerplexityBot', pattern: /PerplexityBot/i, company: 'Perplexity', purpose: 'Real-time Search' },
      { name: 'OAI-SearchBot', pattern: /OAI-SearchBot/i, company: 'OpenAI', purpose: 'SearchGPT' },
      { name: 'BingPreview', pattern: /BingPreview/i, company: 'Microsoft', purpose: 'Grounding' },
    ]
  },
  ai_assistant: {
    label: 'AI-Assistenten',
    bots: [
      { name: 'ChatGPT-User', pattern: /ChatGPT-User/i, company: 'OpenAI', purpose: 'User Browsing' },
      { name: 'Claude-Web', pattern: /Claude-Web/i, company: 'Anthropic', purpose: 'User Browsing' },
    ]
  }
};

async function parseLogFile(filePath) {
  const stats = {};
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const logRegex = /^(\S+) (\S+) (\S+) \[(.*?)\] "(.*?)" (\d{3}) (\S+) "(.*?)" "(.*?)"/;

  for await (const line of rl) {
    const match = line.match(logRegex);
    if (!match) continue;

    const [,, , , timestamp, requestLine, status, , , userAgent] = match;
    const date = timestamp.split(':')[0]; // DD/MMM/YYYY
    const request = requestLine.split(' ')[1] || '/';

    if (!stats[date]) {
      stats[date] = {
        total: 0,
        categories: { seo: 0, ai_training: 0, ai_search: 0, ai_assistant: 0, other: 0 },
        bots: {},
        pages: {}
      };
    }

    stats[date].total++;
    let found = false;

    for (const [catKey, catData] of Object.entries(BOT_CATEGORIES)) {
      for (const bot of catData.bots) {
        if (bot.pattern.test(userAgent)) {
          stats[date].categories[catKey]++;
          
          if (!stats[date].bots[bot.name]) {
            stats[date].bots[bot.name] = { 
              count: 0, 
              lastSeen: timestamp, 
              company: bot.company, 
              purpose: bot.purpose,
              category: catKey,
              pages: {}
            };
          }
          
          stats[date].bots[bot.name].count++;
          stats[date].bots[bot.name].lastSeen = timestamp;
          stats[date].bots[bot.name].pages[request] = (stats[date].bots[bot.name].pages[request] || 0) + 1;
          
          // Overall top pages per category
          stats[date].pages[catKey] = stats[date].pages[catKey] || {};
          stats[date].pages[catKey][request] = (stats[date].pages[catKey][request] || 0) + 1;
          
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
        current[date].categories[cat] = (current[date].categories[cat] || 0) + data.categories[cat];
      }
      for (const [botName, botData] of Object.entries(data.bots)) {
        if (!current[date].bots[botName]) {
          current[date].bots[botName] = botData;
        } else {
          current[date].bots[botName].count += botData.count;
          current[date].bots[botName].lastSeen = botData.lastSeen;
          for (const [page, count] of Object.entries(botData.pages)) {
            current[date].bots[botName].pages[page] = (current[date].bots[botName].pages[page] || 0) + count;
          }
        }
      }
      // Merge category top pages
      current[date].pages = current[date].pages || {};
      for (const [cat, pages] of Object.entries(data.pages || {})) {
        current[date].pages[cat] = current[date].pages[cat] || {};
        for (const [page, count] of Object.entries(pages)) {
          current[date].pages[cat][page] = (current[date].pages[cat][page] || 0) + count;
        }
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
