import os
import glob
import hashlib

# Die kombinierten Zitate (aus der Liste + frisch von LinkedIn gescrapt)
quotes = [
    # --- Die 20 Original-Tacheles Zitate ---
    "Das Problem ist nicht, dass Google dich hasst. Das Problem ist, dass deine Seite technisch eine reine Katastrophe ist. Räum den Keller auf, bevor du das Dach neu streichst.",
    "Jeder redet über KI-Generatoren, aber keiner macht seine verdammten Hausaufgaben. Wer Basic-SEO nicht beherrscht, den wird auch kein ChatGPT retten.",
    "Rankings sind Vanity-Metriken. Was bringen dir 10.000 Besucher, wenn am Ende niemand anruft oder kauft? SEO muss Umsatz treiben.",
    "24 Jahre in dieser Branche haben mich eins gelehrt: Jeder Hype geht vorbei, aber sauberes Handwerk und echter Nutzerfokus überleben jedes Core Update.",
    "Große Agenturen verkaufen dir gerne einen Junior für den Preis eines Seniors. Ich verkaufe dir meine 24 Jahre Erfahrung, komprimiert auf das, was funktioniert.",
    "Vergiss das 'Keyword-Vollstopfen'. Schreib für Menschen, strukturiere für Maschinen.",
    "Backlinks kaufen? Viel Spaß beim Russisch Roulette mit deinem Business. Bau lieber eine Plattform, die so gut ist, dass die Leute freiwillig auf dich verlinken.",
    "SEO ist heutzutage keine schwarze Magie mehr, es ist einfach extrem gutes Handwerk.",
    "Guck dir mal deinen PageSpeed auf dem Handy an. Wenn der Nutzer dreimal Kaffee kochen kann, bis deine Seite lädt, ist er längst bei der Konkurrenz.",
    "SEO-Tools sind wie ein Skalpell. In der Hand eines Anfängers lebensgefährlich, in der Hand eines Experten ein Präzisionswerkzeug.",
    "Es gibt keinen Quick Fix für SEO. SEO ist ein Marathon, kein Sprint. Wer das nicht versteht, sollte Ads schalten.",
    "Lokales SEO ist heutzutage oft der schnellste Weg zum Umsatz. Wer sein Google Business Profile verstauben lässt, überlässt der Konkurrenz das Feld.",
    "Die 'Sichtbarkeit' ist ein schöner Graph für den Quartalsbericht. Aber am Ende des Monats zählt nur, wie oft die Kasse geklingelt hat.",
    "Eine Website ohne klare Hierarchie und interne Verlinkung ist wie ein Supermarkt ohne Wegweiser.",
    "Es gibt keine 'geheimen Rankingfaktoren'. Google will die beste Antwort für den Nutzer. Sei die beste Antwort.",
    "Wenn dein Relaunch am Sonntagabend schiefgeht, brauchst du jemanden, der direkt in den Code geht und rettet, was zu retten ist.",
    "Suchmaschinen haben noch nie ein Produkt gekauft. Überzeuge den Menschen, der hinter der Tastatur sitzt.",
    "Strukturierte Daten sind absolute Pflicht. Serviere Google die Daten maschinenlesbar auf dem Silbertablett.",
    "Ein SEO-Audit, der als 100-seitiges PDF in der Schublade verstaubt, ist wertlos. Was müssen wir MORGEN ändern, damit es besser wird?",
    "Der größte Fehler im modernen SEO? Den Nutzern keine echte Expertise (E-E-A-T) zu liefern. KI kann keine 24 Jahre Praxiserfahrung simulieren.",
    
    # --- Die 20 frisch von LinkedIn gescrapten Zitate ---
    "Warum machen Unternehmen immer noch Relaunches, ohne vorher einen SEO zu fragen? Da wird monatelang designt und entwickelt, und am Tag nach dem Go-Live sind alle Rankings weg.",
    "24 Jahre SEO - und wir machen immer noch die gleichen Fehler? 🦖",
    "Nur, weil deine Website von außen schön aussieht, heißt das nicht, dass sie Rankings produziert.",
    "Wie schön deine Seite ist, korreliert nicht damit, wie viele Besucher du bekommst.",
    "SEO ist kein Projekt, das man einmal macht und dann vergisst. Es ist ein Prozess, keine Einmal-Spritze.",
    "GEO, AIO, AI-SEO... und warum ihr bitte NICHT den Praktikanten dransetzen solltet. 🦖",
    "70% von AI-SEO ist einfach nur sauberes, klassisches SEO. Handwerk. Keine Magie.",
    "AI-Strategie ist Chefsache, keine Aufgabe für den Praktikanten am Freitagnachmittag.",
    "Alle rennen gerade rum wie aufgescheuchte Hühner, weil 'Search' sich ändert. Mein Rat: Relax.",
    "Wenn deine Seite technisch eine Katastrophe ist und du nicht mal in den Top 10 rankst, brauchst du dir über ChatGPT keine Gedanken machen.",
    "Wer nur Keywords zählt, wird von der KI ersetzt. Wer Marken aufbaut und Zusammenhänge versteht, bleibt.",
    "PDF-Datenbanken als Secret Weapon: AI-Modelle lieben strukturierte Daten.",
    "Als externer Berater kann ich den Finger in die Wunde legen, ohne Angst um meinen Schreibtischstuhl zu haben.",
    "Wer CEO-Sprache spricht, bekommt auch Budgets.",
    "Unsere wichtigste Skill ist die Übersetzung von 'Canonical Tag fehlt' in 'Wir verlieren gerade Umsatz, Chef'.",
    "Vielleicht sollten wir uns bald eher 'Digitale Unternehmensberater' nennen.",
    "Messbarkeit ist oft ein Albtraum. Aber der eine Klick, der durchkam, hat konvertiert.",
    "Der SEO TÜV: Einmal im Jahr unter die Haube schauen, bevor der Motor raucht.",
    "Google Core Update - Die Antwort ist oft hart: Deine Seite ist einfach nicht gut genug für den Nutzer.",
    "Zweitmeinung mit ehrlichen Augen: Manchmal sieht man vor lauter Keywords den Wald nicht mehr."
]

glossary_dir = "/Users/jorti/Documents/Antigravity/src/content/glossar"
files = glob.glob(os.path.join(glossary_dir, "*.md"))

injected_count = 0

for file_path in files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Check if a quote is already injected
    if "💬" in content or "Tacheles" in content or "Jörgs SEO-Klartext" in content or "Magic Writing Podcast" in content or "SEOpresso" in content:
        continue
        
    # Pick a consistent quote based on the filename
    filename = os.path.basename(file_path)
    hash_val = int(hashlib.md5(filename.encode('utf-8')).hexdigest(), 16)
    selected_quote = quotes[hash_val % len(quotes)]
    
    parts = content.split("---")
    if len(parts) >= 3:
        frontmatter = parts[1]
        body = "---".join(parts[2:])
        
        paragraphs = body.strip().split("\n\n")
        
        insert_idx = 0
        for i, p in enumerate(paragraphs):
            if "Moin!" in p:
                insert_idx = min(len(paragraphs), i + 2)
                break
        
        if insert_idx == 0:
            for i, p in enumerate(paragraphs):
                if not p.startswith("#") and p.strip() != "":
                    insert_idx = min(len(paragraphs), i + 1)
                    break
        
        quote_block = f"""
<div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
  <p class="font-bold text-lime-600 mb-2">💬 Jörgs SEO-Klartext (LinkedIn Insights)</p>
  <p class="italic text-dark mb-0">"{selected_quote}"</p>
</div>
"""
        paragraphs.insert(insert_idx, quote_block.strip())
        new_body = "\n\n".join(paragraphs)
        new_content = f"---{frontmatter}---{new_body}\n"
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        
        injected_count += 1
        print(f"Injected quote into {filename}")

print(f"Done! Injected combined quotes into {injected_count} glossary articles.")
