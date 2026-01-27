#!/bin/bash

# ============================================
# Deploy Script für teleschmie.de
# ============================================
# Dieses Script lädt alle Dateien aus dem dist/
# Ordner auf deinen IONOS Webspace hoch.
#
# Voraussetzung: lftp muss installiert sein
# macOS: brew install lftp
# Linux: apt install lftp
# ============================================

# SFTP Zugangsdaten
HOST="home73438258.1and1-data.host"
PORT="22"
USER="acc679476295"
PASS="ec6ht9!!sBeMD!w"

# Lokaler Ordner mit den Website-Dateien
LOCAL_DIR="./dist"

# Remote-Pfad (Root = /)
REMOTE_DIR="/"

echo "🚀 Starte Upload zu teleschmie.de..."
echo "   Host: $HOST"
echo "   User: $USER"
echo ""

# Prüfen ob lftp installiert ist
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp ist nicht installiert!"
    echo "   macOS: brew install lftp"
    echo "   Linux: apt install lftp"
    exit 1
fi

# Prüfen ob dist/ existiert
if [ ! -d "$LOCAL_DIR" ]; then
    echo "❌ Ordner $LOCAL_DIR nicht gefunden!"
    echo "   Führe erst 'npm run build' aus."
    exit 1
fi

# Upload via lftp (SFTP)
lftp -c "
set sftp:auto-confirm yes;
set ssl:verify-certificate no;
open sftp://$USER:$PASS@$HOST:$PORT;
cd $REMOTE_DIR;
echo '📂 Aktueller Inhalt auf dem Server:';
ls;
echo '';
echo '📤 Lade Dateien hoch...';
mirror --reverse --delete --verbose $LOCAL_DIR $REMOTE_DIR;
echo '';
echo '✅ Upload abgeschlossen!';
ls;
bye
"

echo ""
echo "🎉 Fertig! Deine Website sollte jetzt unter https://teleschmie.de/ erreichbar sein."
