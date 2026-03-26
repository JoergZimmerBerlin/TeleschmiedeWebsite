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
  seo_classic: {
    label: 'SEO (Classic)',
    description: 'Traditionelle Suchmaschinen-Crawler.',
    bots: [
      { name: 'Googlebot', pattern: /Googlebot(?!\-Other)/i, provider: 'Google', purpose: 'Standard Indexierung' },
      { name: 'Bingbot', pattern: /bingbot/i, provider: 'Microsoft', purpose: 'Standard Indexierung' },
      { name: 'YandexBot', pattern: /YandexBot/i, provider: 'Yandex', purpose: 'Indexierung' },
      { name: 'Baiduspider', pattern: /Baiduspider/i, provider: 'Baidu', purpose: 'Indexierung' },
    ]
  },
  ai_assistant: {
    label: 'AI-Assistenten (Zitate)',
    description: 'Echtzeit-Anfragen f&uuml;r Zitate in AI-Antworten (High-Value).',
    bots: [
      { name: 'ChatGPT-User', pattern: /ChatGPT-User/i, provider: 'OpenAI', purpose: 'Citation / Browsing' },
      { name: 'Claude-User', pattern: /Claude-User/i, provider: 'Anthropic', purpose: 'Citation / Browsing' },
      { name: 'Perplexity-User', pattern: /Perplexity-User/i, provider: 'Perplexity', purpose: 'Citation / Browsing' },
    ]
  },
  geo_grounding: {
    label: 'GEO / Search Bots',
    description: 'AI-Suche & KI-augmentierte Indexierung.',
    bots: [
      { name: 'PerplexityBot', pattern: /PerplexityBot/i, provider: 'Perplexity', purpose: 'Search Index (GEO)' },
      { name: 'OAI-SearchBot', pattern: /OAI-SearchBot/i, provider: 'OpenAI', purpose: 'Search Index (GEO)' },
      { name: 'BingPreview', pattern: /BingPreview/i, provider: 'Microsoft', purpose: 'Grounding (GEO)' },
      { name: 'Google-Other', pattern: /Google\-Other/i, provider: 'Google', purpose: 'AI Overviews (GEO)' },
    ]
  },
  ai_training: {
    label: 'AI-Training',
    description: 'Bulk-Scraping f&uuml;r Modell-Training.',
    bots: [
      { name: 'GPTBot', pattern: /GPTBot/i, provider: 'OpenAI', purpose: 'Training' },
      { name: 'ClaudeBot', pattern: /ClaudeBot/i, provider: 'Anthropic', purpose: 'Training' },
      { name: 'CCBot', pattern: /CCBot/i, provider: 'Common Crawl', purpose: 'Dataset' },
      { name: 'Meta-ExternalAgent', pattern: /Meta-ExternalAgent/i, provider: 'Meta', purpose: 'Training' },
      { name: 'Amazonbot', pattern: /Amazonbot/i, provider: 'Amazon', purpose: 'Training' },
      { name: 'Applebot', pattern: /Applebot/i, provider: 'Apple', purpose: 'Training' },
      { name: 'ByteSpider', pattern: /ByteSpider/i, provider: 'ByteDance', purpose: 'Training' },
    ]
  }
};

const TOTAL_AI_BOTS = Object.values(BOT_CATEGORIES).reduce((acc, cat) => cat.label.includes('AI') || cat.label.includes('GEO') ? acc + cat.bots.length : acc, 0);

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
    const statusCode = parseInt(status);

    if (!stats[date]) {
      stats[date] = {
        total: 0,
        categories: {},
        errors: { total: 0, byCategory: {} },
        bots: {},
        pages: {}
      };
      Object.keys(BOT_CATEGORIES).forEach(k => stats[date].categories[k] = 0);
      stats[date].categories.other = 0;
    }

    stats[date].total++;
    let found = false;

    for (const [catKey, catData] of Object.entries(BOT_CATEGORIES)) {
      for (const bot of catData.bots) {
        if (bot.pattern.test(userAgent)) {
          stats[date].categories[catKey]++;
          
          if (statusCode >= 400) {
              stats[date].errors.total++;
              stats[date].errors.byCategory[catKey] = (stats[date].errors.byCategory[catKey] || 0) + 1;
          }

          if (!stats[date].bots[bot.name]) {
            stats[date].bots[bot.name] = { 
              count: 0, 
              lastSeen: timestamp, 
              provider: bot.provider, 
              purpose: bot.purpose,
              category: catKey,
              pages: {},
              errors: 0
            };
          }
          
          stats[date].bots[bot.name].count++;
          stats[date].bots[bot.name].lastSeen = timestamp;
          stats[date].bots[bot.name].pages[request] = (stats[date].bots[bot.name].pages[request] || 0) + 1;
          if (statusCode >= 400) stats[date].bots[bot.name].errors++;
          
          // AI Visibility tracking
          if (catKey !== 'seo_classic') {
            if (!stats[date].pages[request]) {
                stats[date].pages[request] = { bots: {}, count: 0, errors: 0 };
            }
            stats[date].pages[request].bots[bot.name] = true;
            stats[date].pages[request].count++;
            if (statusCode >= 400) stats[date].pages[request].errors++;
          }
          
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

  for (const date in stats) {
    for (const page in stats[date].pages) {
        stats[date].pages[page].uniqueBots = Object.keys(stats[date].pages[page].bots).length;
        delete stats[date].pages[page].bots;
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
      
      current[date].errors = current[date].errors || { total: 0, byCategory: {} };
      current[date].errors.total += (data.errors?.total || 0);
      for (const [cat, count] of Object.entries(data.errors?.byCategory || {})) {
        current[date].errors.byCategory[cat] = (current[date].errors.byCategory[cat] || 0) + count;
      }

      for (const cat of Object.keys(data.categories)) {
        current[date].categories[cat] = (current[date].categories[cat] || 0) + data.categories[cat];
      }
      for (const [botName, botData] of Object.entries(data.bots)) {
        if (!current[date].bots[botName]) {
          current[date].bots[botName] = botData;
        } else {
          current[date].bots[botName].count += botData.count;
          current[date].bots[botName].lastSeen = botData.lastSeen;
          current[date].bots[botName].errors = (current[date].bots[botName].errors || 0) + (botData.errors || 0);
          for (const [page, count] of Object.entries(botData.pages)) {
            current[date].bots[botName].pages[page] = (current[date].bots[botName].pages[page] || 0) + count;
          }
        }
      }
      current[date].pages = current[date].pages || {};
      for (const [page, pData] of Object.entries(data.pages || {})) {
        if (!current[date].pages[page]) {
            current[date].pages[page] = pData;
        } else {
            current[date].pages[page].count += pData.count;
            current[date].pages[page].errors = (current[date].pages[page].errors || 0) + (pData.errors || 0);
            current[date].pages[page].uniqueBots = Math.max(current[date].pages[page].uniqueBots, pData.uniqueBots);
        }
      }
    }
  }
}
async function run() {
  const args = process.argv.slice(2);
  const mode = args[0] || '--all';

  console.log(`--- Starting 2026 AI/GEO Log Analysis [Mode: ${mode}] ---`);
  console.log(`Tracking ${TOTAL_AI_BOTS} AI/Assistant Bots f&uuml;r Citation Accuracy.`);

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
      
      // Store total bot count for score calculation in dashboard
      history._meta = { total_ai_bots: TOTAL_AI_BOTS };

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
