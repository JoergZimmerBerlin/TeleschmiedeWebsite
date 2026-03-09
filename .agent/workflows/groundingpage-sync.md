---
description: Syncs changes from groundingpage.astro to groundingpage-en.astro
---

This workflow ensures that the English grounding page stays in sync with the German one.

// turbo-all
1. Check the git history for recent changes to the German grounding page.
```bash
git log -n 1 --oneline src/pages/groundingpage.astro
```

2. If changes were made, identify them and translate them to English.
3. Apply the translated changes to `src/pages/groundingpage-en.astro`.
4. Run `npm run build` to verify the syntax.
5. If the user requests deployment, use the `deploy` workflow.
