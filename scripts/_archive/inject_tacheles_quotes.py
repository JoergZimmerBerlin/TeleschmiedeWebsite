import os
import glob
import hashlib

# Die 24 Jahre Jörg Zimmer Experience Quotes - hart, direkt, kompetent
quotes = [
    "Das Problem ist nicht, dass Google dich hasst. Das Problem ist, dass deine Seite technisch eine reine Katastrophe ist. Räum den Keller auf, bevor du das Dach neu streichst.",
    "Jeder redet über KI-Generatoren, aber keiner macht seine verdammten Hausaufgaben. Wer Basic-SEO nicht beherrscht, den wird auch kein ChatGPT retten.",
    "Rankings sind Vanity-Metriken. Was bringen dir 10.000 Besucher, wenn am Ende niemand anruft oder kauft? SEO muss Umsatz treiben, alles andere ist Zeitverschwendung.",
    "24 Jahre in dieser Branche haben mich eins gelehrt: Jeder Hype geht vorbei, aber sauberes Handwerk und echter Nutzerfokus überleben jedes Core Update.",
    "Große Agenturen verkaufen dir gerne einen Junior für den Preis eines Seniors. Ich verkaufe dir meine 24 Jahre Erfahrung, komprimiert auf das, was wirklich funktioniert.",
    "Vergiss das 'Keyword-Vollstopfen'. Wenn dein Text nicht die echte Frage deines Kunden beantwortet, ist er wertlos. Schreib für Menschen, strukturiere für Maschinen.",
    "Backlinks kaufen? Viel Spaß beim Russisch Roulette mit deinem Business. Bau lieber eine Plattform, die so gut ist, dass die Leute freiwillig auf dich verlinken.",
    "Wenn ich noch einen 'Experten' sehe, der H1-Überschriften auf Größe 12pt versteckt... SEO ist heutzutage keine schwarze Magie mehr, es ist einfach extrem gutes Handwerk.",
    "Du wunderst dich, warum du nicht rankst? Guck dir mal deinen PageSpeed auf dem Handy an. Wenn der Nutzer dreimal Kaffee kochen kann, bis deine Seite lädt, ist er längst bei der Konkurrenz.",
    "SEO-Tools sind wie ein Skalpell. In der Hand eines Anfängers lebensgefährlich, in der Hand eines Experten ein Präzisionswerkzeug. Vertrau nicht blind auf irgendwelche Scores.",
    "Die Leute fragen mich oft nach dem 'Quick Fix' für SEO. Meine Antwort: Es gibt keinen. SEO ist ein Marathon, kein Sprint. Wer das nicht versteht, sollte Ads schalten.",
    "Lokales SEO ist heutzutage oft der schnellste Weg zum Umsatz. Wer sein Google Business Profile verstauben lässt, überlässt der Konkurrenz freiwillig das Feld.",
    "Die 'Sichtbarkeit' ist ein schöner Graph für den Quartalsbericht. Aber am Ende des Monats zählt nur, wie oft das Telefon geklingelt oder die Kasse geklingelt hat.",
    "Eine Website ohne klare Hierarchie und interne Verlinkung ist wie ein Supermarkt ohne Wegweiser. Stell dir vor, du suchst Milch, und stehst plötzlich bei den Autoreifen.",
    "Es gibt keine 'geheimen Rankingfaktoren'. Google will die beste Antwort für den Nutzer liefern. Also sei verdammt noch mal die beste Antwort in deiner Nische.",
    "Wenn dein Relaunch an einem Sonntagabend schiefgeht, hilft dir keine PowerPoint-Präsentation einer Großagentur. Dann brauchst du jemanden, der direkt in den Code geht und rettet, was zu retten ist.",
    "Viele schreiben Texte für Suchmaschinen. Großer Fehler. Suchmaschinen haben noch nie ein Produkt gekauft. Überzeuge den Menschen, der hinter der Tastatur sitzt.",
    "Strukturierte Daten sind 2026 keine Kür mehr, sie sind absolute Pflicht. Wenn du Google die Daten nicht maschinenlesbar auf dem Silbertablett servierst, machst du dir das Leben unnötig schwer.",
    "Ein SEO-Audit, der als 100-seitiges PDF in deiner Schublade verstaubt, ist wertlos. Es geht um Priorisierung und glasklare Umsetzung: Was müssen wir MORGEN ändern, damit es besser wird?",
    "Der größte Fehler im modernen SEO? Den Nutzern keine echte, menschliche Expertise (E-E-A-T) zu liefern. KI kann Text spucken, aber KI kann keine 24 Jahre Praxiserfahrung simulieren."
]

glossary_dir = "/Users/jorti/Documents/Antigravity/src/content/glossar"
files = glob.glob(os.path.join(glossary_dir, "*.md"))

injected_count = 0

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Skip if it already has a Tacheles/Insight quote
    if "💬" in content or "Tacheles" in content or "Insight" in content:
        continue
        
    # Get a consistent quote based on the filename hash
    filename = os.path.basename(file_path)
    hash_val = int(hashlib.md5(filename.encode('utf-8')).hexdigest(), 16)
    selected_quote = quotes[hash_val % len(quotes)]
    
    # Try to find the insertion point: right after "Moin!" and the first paragraph
    # Or just after the first paragraph if "Moin!" is missing
    
    parts = content.split("---")
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = "---".join(parts[2:])
        
        # Split body by double newlines to find paragraphs
        paragraphs = body.strip().split("\n\n")
        
        insert_idx = 0
        for i, p in enumerate(paragraphs):
            if "Moin!" in p:
                # Insert after the paragraph that follows "Moin!"
                insert_idx = min(len(paragraphs), i + 2)
                break
        
        if insert_idx == 0:
            # If no Moin, just insert after the first real paragraph
            for i, p in enumerate(paragraphs):
                if not p.startswith("#") and p.strip() != "":
                    insert_idx = min(len(paragraphs), i + 1)
                    break
        
        # Construct the quote block
        quote_block = f"""
<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">💬 Jörgs SEO-Klartext</p>
  <p class="italic text-dark mb-0">"{selected_quote}"</p>
</div>
"""
        # Insert
        paragraphs.insert(insert_idx, quote_block.strip())
        
        new_body = "\n\n".join(paragraphs)
        new_content = f"---{frontmatter}---{new_body}\n"
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        
        injected_count += 1
        print(f"Injected quote into {filename}")

print(f"Done! Injected personal quotes into {injected_count} glossary articles.")
