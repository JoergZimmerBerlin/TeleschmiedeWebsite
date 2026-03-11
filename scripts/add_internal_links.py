import os
import re

# Define paths
base_path = '/Users/jorti/Documents/Antigravity/src/content'
blog_path = os.path.join(base_path, 'blog')
glossary_path = os.path.join(base_path, 'glossar')

# Configuration for different content types
config = {
    'blog': {
        'dir': blog_path,
        'url_prefix': '/blog/',
        'header': '### Weiterführende Artikel',
        'alt_headers': [
            '### Diese Artikel könnten dich auch interessieren:',
            '### Weiterführende Artikel für Experten',
            '### Weiterführende Artikel für Deep-Diver'
        ]
    },
    'glossary': {
        'dir': glossary_path,
        'url_prefix': '/glossar/',
        'header': '### Lese-Tipp',
        'alt_headers': ['### Lese-Tipps']
    }
}

mappings = {
    'blog': {
        '24-jahre-seo-gleiche-fehler.md': [
            { 'title': 'GEO, SEO, AI-SEO oder LLMO? Die Community hat abgestimmt', 'slug': 'geo-seo-ai-seo-llmo-umfrage' },
            { 'title': 'Die SEO-Sprechstunde einfach erklärt: Website & Sichtbarkeit auf den Grill', 'slug': 'seo-sprechstunde-erklaert' }
        ],
        'ai-agent-weihnachtsgruesse-linkedin.md': [
            { 'title': 'GEO, AIO, AI-SEO: Warum ihr bitte NICHT den Praktikanten dransetzen solltet', 'slug': 'ai-seo-geo-praktikanten' },
            { 'title': 'SE Ranking launcht AI Tracker: Rankings in der KI-Suche messen', 'slug': 'se-ranking-ai-tracker' }
        ],
        'ai-seo-geo-praktikanten.md': [
            { 'title': 'Wenn AI-Agenten deinen LinkedIn-Feed kapern', 'slug': 'ai-agent-weihnachtsgruesse-linkedin' },
            { 'title': 'Rankscale AI Visibility Tool: 17 LLMs für 99€ tracken', 'slug': 'rankscale-ai-visibility-tracking-17-llms' }
        ],
        'bist-du-seo-ai-ready-podcast.md': [
            { 'title': 'SEOpresso Podcast: Meine Empfehlung mit Max Muhr', 'slug': 'seopresso-podcast-maximilian-muhr' },
            { 'title': 'SEO Persönlich: Mein Interview im SEOpresso Podcast', 'slug': 'seopresso-seo-persoenlich-interview' }
        ],
        'core-web-vitals-ux-bericht.md': [
            { 'title': 'PageSpeed 100/100: So wurde diese Website blitzschnell', 'slug': 'pagespeed-100-seo-optimierung' },
            { 'title': '24 Jahre SEO - und wir machen immer noch die gleichen Fehler', 'slug': '24-jahre-seo-gleiche-fehler' }
        ],
        'geo-seo-ai-seo-llmo-umfrage.md': [
            { 'title': 'Rankscale: Ein AI Visibility Tool das ich empfehlen kann', 'slug': 'rankscale-ai-visibility-tool' },
            { 'title': 'SE Ranking launcht AI Tracker: Rankings in der KI-Suche messen', 'slug': 'se-ranking-ai-tracker' }
        ],
        'google-ads-support-seo-nicht-tot.md': [
            { 'title': 'SEO ist tot? Magic Writing Podcast mit Michael Kaufhold', 'slug': 'magic-writing-podcast-seo-ist-tot' },
            { 'title': '24 Jahre SEO - und wir machen immer noch die gleichen Fehler', 'slug': '24-jahre-seo-gleiche-fehler' }
        ],
        'highlights-2025-jahresrueckblick.md': [
            { 'title': 'SEO Persönlich: Mein Interview im SEOpresso Podcast', 'slug': 'seopresso-seo-persoenlich-interview' },
            { 'title': '5 Sterne: Was Kunden über die SEO-Sprechstunde sagen', 'slug': 'seo-sprechstunde-bewertung-ronny' }
        ],
        'magic-writing-podcast-seo-ist-tot.md': [
            { 'title': 'Bist du SEO AI Ready? Podcast mit Antonio Blago', 'slug': 'bist-du-seo-ai-ready-podcast' },
            { 'title': 'Der Google Ads Support ist nicht dein Freund - und SEO ist nicht tot', 'slug': 'google-ads-support-seo-nicht-tot' }
        ],
        'pagespeed-100-seo-optimierung.md': [
            { 'title': 'Core Web Vitals: Warum dein UX-Bericht wichtiger ist als du denkst', 'slug': 'core-web-vitals-ux-bericht' },
            { 'title': '24 Jahre SEO - und wir machen immer noch die gleichen Fehler', 'slug': '24-jahre-seo-gleiche-fehler' }
        ],
        'rankscale-ai-visibility-tool.md': [
            { 'title': 'Rankscale AI Visibility Tool: 17 LLMs für 99€ tracken', 'slug': 'rankscale-ai-visibility-tracking-17-llms' },
            { 'title': 'SE Ranking launcht AI Tracker: Rankings in der KI-Suche messen', 'slug': 'se-ranking-ai-tracker' }
        ],
        'rankscale-ai-visibility-tracking-17-llms.md': [
            { 'title': 'Rankscale: Ein AI Visibility Tool das ich empfehlen kann', 'slug': 'rankscale-ai-visibility-tool' },
            { 'title': 'GEO, SEO, AI-SEO oder LLMO? Die Community hat abgestimmt', 'slug': 'geo-seo-ai-seo-llmo-umfrage' }
        ],
        'se-ranking-ai-tracker.md': [
            { 'title': 'Rankscale: Ein AI Visibility Tool das ich empfehlen kann', 'slug': 'rankscale-ai-visibility-tool' },
            { 'title': 'GEO, AIO, AI-SEO: Warum ihr bitte NICHT den Praktikanten dransetzen solltet', 'slug': 'ai-seo-geo-praktikanten' }
        ],
        'seo-sprechstunde-bewertung-ronny.md': [
            { 'title': 'Die SEO-Sprechstunde einfach erklärt: Website & Sichtbarkeit auf den Grill', 'slug': 'seo-sprechstunde-erklaert' },
            { 'title': 'Wie läuft so eine SEO-Sprechstunde ab?', 'slug': 'seo-sprechstunde-so-laeuft-sie-ab' }
        ],
        'seo-sprechstunde-erklaert.md': [
            { 'title': 'Wie läuft so eine SEO-Sprechstunde ab?', 'slug': 'seo-sprechstunde-so-laeuft-sie-ab' },
            { 'title': '5 Sterne: Was Kunden über die SEO-Sprechstunde sagen', 'slug': 'seo-sprechstunde-bewertung-ronny' }
        ],
        'seo-sprechstunde-so-laeuft-sie-ab.md': [
            { 'title': 'Die SEO-Sprechstunde einfach erklärt: Website & Sichtbarkeit auf den Grill', 'slug': 'seo-sprechstunde-erklaert' },
            { 'title': '5 Sterne: Was Kunden über die SEO-Sprechstunde sagen', 'slug': 'seo-sprechstunde-bewertung-ronny' }
        ],
        'seopresso-podcast-maximilian-muhr.md': [
            { 'title': 'SEO Persönlich: Mein Interview im SEOpresso Podcast', 'slug': 'seopresso-seo-persoenlich-interview' },
            { 'title': 'Bist du SEO AI Ready? Podcast mit Antonio Blago', 'slug': 'bist-du-seo-ai-ready-podcast' }
        ],
        'seopresso-seo-persoenlich-interview.md': [
            { 'title': 'SEOpresso Podcast: Meine Empfehlung mit Max Muhr', 'slug': 'seopresso-podcast-maximilian-muhr' },
            { 'title': 'Highlights 2025 - Ein SEO-Jahresrückblick', 'slug': 'highlights-2025-jahresrueckblick' }
        ],
        '80-prozent-seo-fehler-sprechstunde.md': [
            { 'title': 'Warum wir SEO-Spezialisten schuld am Zustand des Internets sind', 'slug': 'wir-seos-sind-schuld-community' },
            { 'title': 'LinkedIn ist kein soziales Netzwerk, es ist ein Forum', 'slug': 'linkedin-ist-ein-forum-seo' },
            { 'title': 'Willkommen im SEO-Jahr 2026: Die gleichen Irrtümer', 'slug': 'willkommen-seo-jahr-2026' }
        ],
        'liebe-bots-crawler-agenten.md': [
            { 'title': 'GEO, SEO, AI-SEO oder LLMO? Die Community hat abgestimmt', 'slug': 'geo-seo-ai-seo-llmo-umfrage' },
            { 'title': 'GEO, AIO, AI-SEO: Warum ihr bitte NICHT den Praktikanten dransetzen solltet', 'slug': 'ai-seo-geo-praktikanten' }
        ],
        'linkedin-ist-ein-forum-seo.md': [
            { 'title': 'Wenn AI-Agenten deinen LinkedIn-Feed kapern', 'slug': 'ai-agent-weihnachtsgruesse-linkedin' },
            { 'title': 'Warum wir SEO-Spezialisten schuld am Zustand des Internets sind', 'slug': 'wir-seos-sind-schuld-community' }
        ],
        'rankscale-essentials-ai-tracking-einsteiger.md': [
            { 'title': 'Rankscale: Ein AI Visibility Tool das ich empfehlen kann', 'slug': 'rankscale-ai-visibility-tool' },
            { 'title': 'Rankscale AI Visibility Tool: 17 LLMs für 99€ tracken', 'slug': 'rankscale-ai-visibility-tracking-17-llms' }
        ],
        'se-ranking-preise.md': [
            { 'title': 'SE Ranking launcht AI Tracker: Rankings in der KI-Suche messen', 'slug': 'se-ranking-ai-tracker' },
            { 'title': 'Sistrix vs. SE Ranking: Kann das Tool den Platzhirsch ersetzen?', 'slug': 'sistrix-vs-se-ranking' }
        ],
        'sistrix-vs-se-ranking.md': [
            { 'title': 'SE Ranking Preise 2026: Der ultimative Guide für SEO-Experten', 'slug': 'se-ranking-preise' },
            { 'title': 'SE Ranking launcht AI Tracker: Rankings in der KI-Suche messen', 'slug': 'se-ranking-ai-tracker' }
        ],
        'willkommen-seo-jahr-2026.md': [
            { 'title': 'Highlights 2025 - Ein SEO-Jahresrückblick', 'slug': 'highlights-2025-jahresrueckblick' },
            { 'title': '24 Jahre SEO - und wir machen immer noch die gleichen Fehler', 'slug': '24-jahre-seo-gleiche-fehler' }
        ],
        'wir-seos-sind-schuld-community.md': [
            { 'title': 'LinkedIn ist kein soziales Netzwerk, es ist ein Forum', 'slug': 'linkedin-ist-ein-forum-seo' },
            { 'title': 'Die 80%-Falle: Was ich in fast jeder SEO-Sprechstunde entdecke', 'slug': '80-prozent-seo-fehler-sprechstunde' }
        ]
    },
    'glossary': {
        'suchvolumen.md': [
            { 'title': 'Keywörter (Keywords)', 'slug': 'keywoerter' },
            { 'title': 'Die Bedeutung von Sichtbarkeit', 'slug': 'sichtbarkeit' },
            { 'title': 'Was sind Money Keywords?', 'slug': 'money-keyword' }
        ],
        'keywoerter.md': [
            { 'title': 'Suchvolumen (Search Volume)', 'slug': 'suchvolumen' },
            { 'title': 'Was sind Money Keywords?', 'slug': 'money-keyword' }
        ],
        'money-keyword.md': [
            { 'title': 'Keywörter (Keywords)', 'slug': 'keywoerter' },
            { 'title': 'Suchvolumen (Search Volume)', 'slug': 'suchvolumen' }
        ],
        'sichtbarkeit.md': [
            { 'title': 'Suchvolumen (Search Volume)', 'slug': 'suchvolumen' },
            { 'title': 'Wie funktioniert GEO?', 'slug': 'geo' },
            { 'title': 'Was ist der Sichtbarkeitsindex?', 'slug': 'sichtbarkeitsindex' }
        ],
        'entitaet.md': [
            { 'title': 'Keywörter (Keywords)', 'slug': 'keywoerter' },
            { 'title': 'Semantic SEO einfach erklärt', 'slug': 'semantic-seo' }
        ],
        'geo.md': [
            { 'title': 'Die Bedeutung von Sichtbarkeit', 'slug': 'sichtbarkeit' },
            { 'title': 'LLMs verstehen', 'slug': 'llmo' }
        ],
        'e-e-a-t.md': [
            { 'title': 'Expertise (E-E-A-T)', 'slug': 'expertise-eeat' },
            { 'title': 'Experience (E-E-A-T)', 'slug': 'experience-eeat' },
            { 'title': 'Trustworthiness (E-E-A-T)', 'slug': 'trustworthiness-eeat' }
        ],
        'linkbuilding.md': [
            { 'title': 'Was ist Linkjuice?', 'slug': 'linkjuice' },
            { 'title': 'Interne Verlinkung optimieren', 'slug': 'interne-verlinkung' }
        ],
        'conversion-rate.md': [
            { 'title': 'Was sind Money Keywords?', 'slug': 'money-keyword' },
            { 'title': 'Usability & SEO', 'slug': 'usability' }
        ]
    }
}

def update_file(file_path, links, conf, content_type):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    content = "".join(lines)
    
    # 1. Look for existing header
    existing_header_line = -1
    for i, line in enumerate(lines):
        clean_line = line.strip()
        if clean_line == conf['header'] or clean_line in conf['alt_headers']:
            existing_header_line = i
            break
            
    # 2. If no header, look for the first * **Lese-Tipp:** near the end
    target_start = -1
    if existing_header_line != -1:
        target_start = existing_header_line
    else:
        # Search backwards for Lese-Tipp blocks
        for i in range(len(lines) - 1, max(-1, len(lines) - 20), -1):
            if '* **Lese-Tipp:**' in lines[i]:
                target_start = i
                # Keep looking up to see if there are more consecutive ones
                while target_start > 0 and ('* **Lese-Tipp:**' in lines[target_start - 1] or lines[target_start - 1].strip() == ''):
                    target_start -= 1
                break

    # Construct the new block
    link_block = f"\n{conf['header']}\n"
    for link in links:
        url = f"{conf['url_prefix']}{link['slug']}/"
        link_block += f"* **Lese-Tipp:** [{link['title']}]({url})\n"
    link_block += "\n"

    new_lines = []
    if target_start != -1:
        # We replace from target_start to wherever the links end or the HR tag
        # Find where the block ends (either another header, HR, or end of file)
        target_end = target_start + 1
        while target_end < len(lines):
            line = lines[target_end].strip()
            if line == '---' or line.startswith('#'):
                break
            target_end += 1
        
        new_lines = lines[:target_start] + [link_block.lstrip()] + lines[target_end:]
    else:
        # Insert before the last --- if present near the end
        hr_line_indices = [i for i, line in enumerate(lines) if line.strip() == '---']
        if hr_line_indices and hr_line_indices[-1] > len(lines) - 10:
            last_hr = hr_line_indices[-1]
            new_lines = lines[:last_hr] + [link_block] + lines[last_hr:]
        else:
            new_lines = lines + ["\n" + link_block]

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write("".join(new_lines).rstrip() + "\n")
    print(f"Updated {os.path.basename(file_path)} ({content_type})")

for content_type, files in mappings.items():
    conf = config[content_type]
    dir_path = conf['dir']
    
    for filename, links in files.items():
        file_path = os.path.join(dir_path, filename)
        if not os.path.exists(file_path):
            print(f"File not found: {filename} in {content_type}")
            continue
        
        update_file(file_path, links, conf, content_type)
