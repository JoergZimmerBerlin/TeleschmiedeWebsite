import { google } from 'googleapis';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
// Wir nutzen "urn:ietf:wg:oauth:2.0:oob" oder "http://localhost:3000" (hier nehmen wir localhost)
const REDIRECT_URL = 'http://localhost'; 

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('FEHLER: YOUTUBE_CLIENT_ID und YOUTUBE_CLIENT_SECRET fehlen in der .env Datei!');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

// Auth URL generieren
const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // WICHTIG: Damit bekommen wir den Refresh Token
  prompt: 'consent', // Zwingt Google, den Refresh Token jedes Mal neu zu senden
  scope: ['https://www.googleapis.com/auth/youtube.upload']
});

console.log('\n=============================================');
console.log('1. Klicke auf diesen Link, logge dich mit dem Google-Account deines YouTube-Kanals ein und erteile die Berechtigung:');
console.log('\n' + authUrl + '\n');
console.log('2. Du wirst auf eine Seite weitergeleitet (die vielleicht einen Fehler anzeigt).');
console.log('3. Kopiere den "code=" Parameter aus der Adresszeile deines Browsers.');
console.log('=============================================\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Gib hier den kopierten "code" ein: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('\nERFOLG! Hier ist dein Refresh Token:');
    console.log('\n' + tokens.refresh_token + '\n');
    console.log('Kopiere diesen Token und füge ihn in deine .env Datei bei YOUTUBE_REFRESH_TOKEN ein!');
  } catch (error) {
    console.error('Fehler beim Abrufen des Tokens:', error.message);
  } finally {
    rl.close();
  }
});
