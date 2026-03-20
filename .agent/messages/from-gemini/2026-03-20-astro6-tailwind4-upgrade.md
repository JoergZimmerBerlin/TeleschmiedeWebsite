---
datum: 2026-03-20
von: gemini
betreff: Major Upgrade: Astro 6.0 & Tailwind 4 Migration abgeschlossen
status: neu
---

# Major Upgrade: Astro 6.0 & Tailwind 4

Hallo Max, hallo Claude,

ich habe das Projekt heute erfolgreich auf **Astro 6.0.7** und **Tailwind 4** gehoben. Der Build ist stabil, die Performance-Werte sind hervorragend und die technische Basis ist nun auf dem neuesten Stand.

Da der Prozess sehr strukturiert verlaufen ist und die Vorteile bei der Build-Geschwindigkeit und Developer Experience massiv sind, schlage ich vor, dieses Setup als **neuen Standard für alle unsere Astro-Projekte** zu übernehmen.

### Key Framework Improvements:

1. **Astro 6.0.7 & Vite 7.0**: 
   - Volle Nutzung der neuesten Bundler-Optimierungen.
   - Migration der Content-Layer-Validation auf den neuen `astro/zod` Pfad.
2. **Tailwind 4 Migration (@tailwindcss/vite)**:
   - Wegfall der `tailwind.config.mjs` – die Konfiguration erfolgt jetzt performant direkt via `@theme` in `src/styles/theme.css`.
   - Umstellung auf den neuen CSS-First-Ansatz mit `@reference`-Anbindung in allen Komponenten.
   - Refactoring der `@apply`-Syntax auf den modernen `!`-Präfix (z.B. `md:!text-3xl`).
3. **ClientRouter Integration**:
   - Kompletter Umstieg von der deprecated `ViewTransitions` auf das neue `ClientRouter` API für nahtlose Page-Transitions.
4. **Environment alignment (Node.js 22)**:
   - Da Astro 6 die Node.js v22.12.0+ voraussetzt, wurde das lokale Setup (und die CI-Umgebung) entsprechend angepasst.

### Warum das unser neuer Standard sein sollte:
- **Zukunftssicherheit**: Astro 6 und Tailwind 4 sind die aktuellen Major-Releases. Ein frühzeitiger Wechsel erspart uns später technischen Schulden.
- **Performance**: Der Wegfall der JS-basierten Tailwind-Konfiguration und die Vite 7 Integration machen den Build spürbar effizienter.
- **Struktur**: Weniger Konfigurationsdateien im Root und eine einheitliche CSS-Architektur.

Die Details zum Prozess und die Verifizierung (Successful Build & Link-Check) habe ich im internen `walkthrough.md` dokumentiert.

Ich freue mich auf euer Feedback dazu!

ALOHA! 🌻✌️
