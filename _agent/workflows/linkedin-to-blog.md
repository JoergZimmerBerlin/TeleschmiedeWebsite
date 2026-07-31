---
description: How to convert a LinkedIn post/article into a high-quality blog post for teleschmie.de
---

# LinkedIn to Blog Conversion Workflow

Use this workflow when Jörg provides a LinkedIn URL or a screenshot of a post to be turned into a blog article.

## 1. Context Extraction
- **Original URL**: Always secure the `linkedin_url` for attribution.
- **Content**: Copy the post text. Pay attention to the "Tacheles" tone (direct, punchy, personal).
- **Comments**: Scan the comments for common questions or controversial takes. Use these for the **FAQ section** and **Key Takeaways**.
- **Media**: Generiere immer eine 3D-Infografik nach den strikten Vorgaben (weiß/lime-grün). **Zusätzlich** musst du das originale Bild aus dem LinkedIn-Post (sofern vorhanden) herunterladen, in `.webp` umwandeln und ebenfalls in den Blogbeitrag einbauen.

## 2. Technical Preparation
- **Image Conversion**: Convert all images to `.webp` format and save them in `src/assets/images/blog/`.
- **File Naming**: Use a descriptive slug (e.g., `seo-feuerwehr-rettung.md`).

## 3. Article Structure (Astro Content)
**WICHTIG (Keine doppelten Bilder):** Das in der Frontmatter unter `image:` verlinkte Hauptbild (die generierte 3D-Infografik) wird vom Astro-Template **automatisch** ganz oben auf der Seite als Hero-Bild gerendert. Füge dieses Bild **NIEMALS** manuell per `![Alt](...)` in den Markdown-Text (Body) ein, da es sonst doppelt erscheint! Nur das *originale LinkedIn-Bild* darf (sofern vorhanden) manuell im Textfluss platziert werden.

Each article must follow this frontmatter structure:
```yaml
---
title: "SEO-Titel ohne Emoji mit besten Keywords (ca. 50 Zeichen)"
description: "Frische Zusammenfassung mit Keywords, ohne Emojis (ca. 140 Zeichen)"
date: "YYYY-MM-DD"
linkedin_url: "https://www.linkedin.com/posts/..."
image: "../../assets/images/blog/filename.webp"
image_alt: "Descriptive alt text"
category: "SEO Praxis" (or AI SEO, Google Ads)
tags: ["Tag1", "Tag2"]
key_takeaways:
  - "Insight 1"
  - "Insight 2"
faqs:
  - question: "Question from comments?"
    answer: "Expert answer in Jörg's style."
---
```

## 4. Writing Style Guidelines
- **Länge & Authentizität**: Der fertige Artikel sollte kurz und knackig sein (ca. 1000-1500 Zeichen). Nutze zwingend die **echten, authentischen Originaltexte** von Jörg sowie die **Original-Kommentare** der User aus dem LinkedIn-Post. Lasse die Kommentare natürlich in den fließenden Text einfließen.
- **LinkedIn Flow**: Short paragraphs, often single sentences.
- **Dynamic Formatting**: Use bold text for emphasis.
- **Direct Address**: Use "Moin! 🌻" or "Aloha! 🌻✌️".
- **Quotes**: Use the custom blockquote-styled `<div>` for LinkedIn-specific quotes (both for Jörg and the commenters):
  ```html
  <div class="my-8 bg-lime-accent/10 border-l-4 border-lime-600 p-6 rounded-r-lg">
    <p class="font-bold text-lime-600 mb-2">💬 Jörgs SEO-Klartext (LinkedIn Insights)</p>
    <p class="italic text-dark mb-0">"The quote goes here."</p>
  </div>
  ```

## 5. Metadata & Verification
- **Reading Time**: Ensure the layout calculates this (Standard: 180 wpm for German).
- **Internal Links**: Link to at least 2 relevant [Glossary items](/glossar/).
- **Origin Attribution**: Ensure the slug template renders "Dieser Beitrag entstand aus diesem LinkedIn-Beitrag".

## 6. Social Media Distribution (Auto-Upload)
- **Condition**: Only execute this phase if the original LinkedIn post contains a **Video**. If it only contains an image/text, skip this phase completely!
- **Action**: Once the blog post is written and the video is in `public/videos/`, you must immediately execute the `upload.js` script to distribute the video.
- **Execution**:
  ```bash
  cd scripts/social-upload
  node upload.js \
    --video="../../public/videos/slug.mp4" \
    --thumb="../../public/images/slug.webp" \
    --title="Your SEO Title" \
    --desc="Short summary." \
    --tags="Tag1, Tag2, SEO" \
    --blog="https://teleschmie.de/blog/slug/" \
    --linkedin="https://www.linkedin.com/posts/..."
  ```
