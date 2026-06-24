import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import minimist from 'minimist';

dotenv.config();

const args = minimist(process.argv.slice(2));
const videoPath = args.video;
const title = args.title || 'Neues Video';
const description = args.desc || '';

if (!videoPath || !fs.existsSync(videoPath)) {
  console.error('Fehler: Bitte gib einen gültigen Pfad zum Video an. Beispiel: node upload.js --video="../../public/videos/clip.mp4"');
  process.exit(1);
}

// 1. YOUTUBE UPLOAD
async function uploadToYouTube() {
  console.log('Starte YouTube-Upload...');
  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.YOUTUBE_REFRESH_TOKEN,
  });

  const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

  try {
    const res = await youtube.videos.insert({
      part: 'snippet,status',
      requestBody: {
        snippet: {
          title,
          description,
          tags: ['SEO', 'Marketing'],
          categoryId: '27', // Education
        },
        status: {
          privacyStatus: 'unlisted', // Für Tests erstmal unlisted
        },
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    });
    console.log('✅ YouTube Upload erfolgreich! Video ID:', res.data.id);
  } catch (error) {
    console.error('❌ Fehler beim YouTube-Upload:', error.message);
  }
}

// 2. FACEBOOK & INSTAGRAM UPLOAD
async function uploadToMeta() {
  console.log('Starte Meta-Upload (Facebook & Instagram)...');
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;
  const domain = process.env.WEBSITE_DOMAIN || 'https://teleschmie.de';
  
  if (!pageAccessToken || !pageId) {
    console.log('Überspringe Meta-Upload: Fehlende API-Keys.');
    return;
  }

  // Da Facebook & Insta am besten über URLs arbeiten (bzw. Insta MUSS über URL laufen),
  // bauen wir die Public URL aus dem Dateipfad zusammen (z.B. /videos/clip.mp4).
  const fileName = path.basename(videoPath);
  const publicVideoUrl = `${domain}/videos/${fileName}`;

  try {
    // Schritt A: Finde die verknüpfte Instagram Business Account ID
    const igAccountRes = await axios.get(`https://graph.facebook.com/v19.0/${pageId}?fields=instagram_business_account&access_token=${pageAccessToken}`);
    const igAccountId = igAccountRes.data.instagram_business_account?.id;

    // Schritt B: Facebook Page Video Upload
    console.log('Lade zu Facebook hoch...');
    const fbRes = await axios.post(`https://graph.facebook.com/v19.0/${pageId}/videos`, {
      title,
      description,
      file_url: publicVideoUrl,
      access_token: pageAccessToken
    });
    console.log('✅ Facebook Upload erfolgreich! Video ID:', fbRes.data.id);

    // Schritt C: Instagram Reels Upload (falls verknüpft)
    if (igAccountId) {
      console.log(`Lade zu Instagram Reels hoch (IG Account ID: ${igAccountId})...`);
      // 1. Reel Container erstellen
      const igRes = await axios.post(`https://graph.facebook.com/v19.0/${igAccountId}/media`, {
        media_type: 'REELS',
        video_url: publicVideoUrl,
        caption: description,
        access_token: pageAccessToken
      });
      const creationId = igRes.data.id;

      // Hinweis: In der Praxis muss man hier oft warten (Status prüfen), bis IG das Video prozessiert hat.
      console.log('Warte 15 Sekunden auf Instagram-Processing...');
      await new Promise(resolve => setTimeout(resolve, 15000));

      // 2. Reel veröffentlichen
      const igPublish = await axios.post(`https://graph.facebook.com/v19.0/${igAccountId}/media_publish`, {
        creation_id: creationId,
        access_token: pageAccessToken
      });
      console.log('✅ Instagram Reels Upload erfolgreich! Media ID:', igPublish.data.id);
    } else {
      console.log('⚠️ Kein Instagram Business Account mit dieser Facebook Page verknüpft.');
    }
  } catch (error) {
    console.error('❌ Fehler beim Meta-Upload:', error.response?.data?.error?.message || error.message);
  }
}

async function run() {
  await uploadToYouTube();
  await uploadToMeta();
  console.log('🎉 Upload-Prozess abgeschlossen.');
}

run();
