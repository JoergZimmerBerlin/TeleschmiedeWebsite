---
description: How to convert a LinkedIn post/article into a high-quality blog post for teleschmie.de
---

# LinkedIn to Blog Conversion Workflow

Use this workflow when Jörg provides a LinkedIn URL or a screenshot of a post to be turned into a blog article.

## 1. Context Extraction
- **Original URL**: Always secure the `linkedin_url` for attribution.
- **Content**: Copy the post text. Pay attention to the "Tacheles" tone (direct, punchy, personal).
- **Comments**: Scan the comments for common questions or controversial takes. Use these for the **FAQ section** and **Key Takeaways**.
- **Media**: Download the main visual. If it's a poll, use the result as an infographic.

## 2. Technical Preparation
- **Image Conversion**: Convert all images to `.webp` format and save them in `src/assets/images/blog/`.
- **File Naming**: Use a descriptive slug (e.g., `seo-feuerwehr-rettung.md`).

## 3. Article Structure (Astro Content)
Each article must follow this frontmatter structure:
```yaml
---
title: "Catchy Title with Emoji 🚀"
description: "Punchy summary for SEO (max 160 chars)."
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
- **LinkedIn Flow**: Short paragraphs, often single sentences.
- **Dynamic Formatting**: Use bold text for emphasis.
- **Direct Address**: Use "Moin! 🌻" or "Aloha! 🌻✌️".
- **Quotes**: Use the custom blockquote-styled `<div>` for LinkedIn-specific quotes:
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
