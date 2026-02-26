# QA-Checkliste & Qualitätssicherung (Teleschmiede)

Diese Dokumentation dient als Standard für die Abnahme von Änderungen und die Sicherstellung der Website-Qualität.

## 1. Testfälle für gelöste Bugs

### [BUG-01] Blog-Readability (Spacing)
- **Soll-Zustand:** Überschriften (`h2`, `h3`) haben deutliche Abstände (mt-20/mt-16). Absätze haben konsistente Abstände (`mb-8`). Listenpunkte sind deutlich getrennt.
- **Check:** Öffne `/blog/[slug]/` und prüfe visuell die Abstände. Prüfe, ob die `blog-content` Klasse in der `[slug].astro` korrekt greift.

### [BUG-02] YouTube CSP (Video Block)
- **Soll-Zustand:** Das Video auf der Startseite lädt und spielt ab. Keine `Refused to frame` Fehler in der Konsole.
- **Check:** Startseite öffnen, Video starten. Browser-Konsole (F12) auf CSP-Warnungen prüfen.

### [BUG-03] Broken Images (Git Ignore)
- **Soll-Zustand:** Alle Bilder in `/public/images/blog/` sind live erreichbar.
- **Check:** Bilder im Browser direkt aufrufen. Sicherstellen, dass neue Bilder per `git add -f` hinzugefügt wurden.

---

## 2. Testfälle für neue Features (E-E-A-T & SEO)

### [FEAT-01] Schema.org (Rich Results)
- **Soll-Zustand:** `Article`, `Person`, `ProfessionalService` und `FAQ` sind fehlerfrei vorhanden.
- **Check:** [Google Rich Results Test](https://search.google.com/test/rich-results) nutzen oder im DOM nach `ld+json` suchen. Entity-IDs (`#person`) müssen konsistent verknüpft sein.

### [FEAT-02] Barrierefreiheit (A11y)
- **Soll-Zustand:** Navigierbarkeit per Tastatur (Tab-Order), ARIA-Labels für alle Social-Links, Mobile Menu via `aria-expanded`.
- **Check:** Mit `Tab` durch die Seite navigieren (Focus-Ringe sichtbar?). Mobile Menu öffnen und `aria-expanded` Attribut im Inspector prüfen.

### [FEAT-03] Trailing Slashes
- **Soll-Zustand:** Interne Links enden immer auf `/` (z.B. `/kontakt/`).
- **Check:** Klicke durch die Seite und beobachte die URL in der Adresszeile. Nutze `grep -r "href=\"/"` zur statischen Code-Analyse.

---

## 3. "Definition of Done" (Workflow)
Bevor eine Änderung live geht, MÜSSEN folgende Punkte erfüllt sein:
1.  **Mobile-First Check:** Sieht die Änderung auf dem Smartphone gut aus?
2.  **Konsole prüfen:** Keine JavaScript-Fehler oder CSP-Warnungen.
3.  **Schema Check:** Bei Blog-Configs sicherstellen, dass Frontmatter (Meta-Tags) vollständig ist.
4.  **Link Check:** Keine 404-Links, alle internen Links haben einen Trailing Slash.
5.  **Git Check:** Sind alle neuen Assets (`public/images`) tatsächlich im Repo?
