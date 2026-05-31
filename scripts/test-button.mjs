import { JSDOM } from 'jsdom';

async function run() {
  console.log("Fetching https://teleschmie.de/glossar/ ...");
  const res = await fetch('https://teleschmie.de/glossar/');
  const html = await res.text();
  
  const dom = new JSDOM(html, { runScripts: "dangerously" });
  const doc = dom.window.document;
  
  const cardsBefore = Array.from(doc.querySelectorAll('.glossar-card')).filter(c => !c.classList.contains('hidden'));
  console.log("Cards visible before click:", cardsBefore.length);
  
  const btn = doc.getElementById('show-all-btn');
  if (!btn) {
    console.log("Button not found!");
    return;
  }
  
  console.log("Clicking button...");
  btn.click();
  
  const cardsAfter = Array.from(doc.querySelectorAll('.glossar-card')).filter(c => !c.classList.contains('hidden'));
  console.log("Cards visible after click:", cardsAfter.length);
}

run().catch(console.error);
