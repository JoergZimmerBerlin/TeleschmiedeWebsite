#!/bin/bash

OUTPUT="public/llms-full.txt"
GLOSSARY_DIR="src/content/glossar"
BLOG_DIR="src/content/blog"
DOMAIN="https://teleschmie.de"

# Start with the metadata and entity mapping (adding BOM for IONOS encoding fix)
printf '\357\273\277' > "$OUTPUT"
echo -e "Last Updated: $(date +%Y-%m-%d) | Status: Production / Verified\n" >> "$OUTPUT"
echo -e "## ENTITY MAPPING" >> "$OUTPUT"
echo -e "- SameAs: https://www.linkedin.com/in/joerg-zimmer-seo-sea-freelancer-berlin-spandau/, https://www.youtube.com/@Teleschmiede, https://www.instagram.com/joerg.zimmer.berlin/, https://linktr.ee/jorgzimmer, https://share.google/FELFkQBL46obhnygq, https://web.archive.org/web/20260000000000*/https://teleschmie.de/" >> "$OUTPUT"
echo -e "- SubjectOf: SEO, SEA, GEO, Technical SEO, Performance Marketing\n" >> "$OUTPUT"
echo -e "---\n" >> "$OUTPUT"

cat public/llms.txt >> "$OUTPUT"
echo -e "\n---\n" >> "$OUTPUT"
echo -e "# FULL KNOWLEDGE BASE\n" >> "$OUTPUT"

# Generate Table of Contents for better AI navigation
echo -e "## TABLE OF CONTENTS\n" >> "$OUTPUT"
echo -e "### Glossary\n" >> "$OUTPUT"
for file in $(ls "$GLOSSARY_DIR"/*.md | sort); do
    TITLE=$(grep "^title:" "$file" | head -1 | sed 's/title: //;s/"//g')
    echo "- $TITLE" >> "$OUTPUT"
done

echo -e "\n### Blog Articles\n" >> "$OUTPUT"
for file in $(ls "$BLOG_DIR"/*.md | sort -r); do
    TITLE=$(grep "^title:" "$file" | head -1 | sed 's/title: //;s/"//g')
    echo "- $TITLE" >> "$OUTPUT"
done

echo -e "\n---\n" >> "$OUTPUT"

echo -e "## GLOSSARY\n" >> "$OUTPUT"
# Process Glossary (Alphabetical)
for file in $(ls "$GLOSSARY_DIR"/*.md | sort); do
    TITLE=$(grep "^title:" "$file" | head -1 | sed 's/title: //;s/"//g')
    echo -e "### $TITLE\n" >> "$OUTPUT"
    # Append body content: skip first two frontmatter dashes, absolute URLs, strip HTML
    awk 'BEGIN{c=0} /^---$/ && c<2 {c++; next} c>=2 {print}' "$file" | \
    sed 's/<[^>]*>//g' | \
    sed -E "s|\]\((/[^)]*)\)|]($DOMAIN\1)|g" | \
    sed -E "s|\]\(\.\./\.\./|]($DOMAIN/|g" >> "$OUTPUT"
    echo -e "\n---\n" >> "$OUTPUT"
done

echo -e "## BLOG ARTICLES\n" >> "$OUTPUT"
# Process Blog (Newest first)
for file in $(ls "$BLOG_DIR"/*.md | sort -r); do
    TITLE=$(grep "^title:" "$file" | head -1 | sed 's/title: //;s/"//g')
    echo -e "### $TITLE\n" >> "$OUTPUT"
    # Append body content: skip first two frontmatter dashes, absolute URLs, strip HTML
    awk 'BEGIN{c=0} /^---$/ && c<2 {c++; next} c>=2 {print}' "$file" | \
    sed 's/<[^>]*>//g' | \
    sed -E "s|\]\((/[^)]*)\)|]($DOMAIN\1)|g" | \
    sed -E "s|\]\(\.\./\.\./|]($DOMAIN/|g" >> "$OUTPUT"
    echo -e "\n---\n" >> "$OUTPUT"
done

echo "llms-full.txt updated successfully with absolute URLs and native German character support (UTF-8)."
