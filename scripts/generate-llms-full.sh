#!/bin/bash

OUTPUT="public/llms-full.txt"
GLOSSARY_DIR="src/content/glossar"
BLOG_DIR="src/content/blog"
DOMAIN="https://teleschmie.de"

# Start with the main llms.txt content, sanitize umlauts
cat public/llms.txt | \
sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g' > "$OUTPUT"
echo -e "\n---\n" >> "$OUTPUT"
echo -e "# FULL KNOWLEDGE BASE\n" >> "$OUTPUT"

echo -e "## GLOSSARY\n" >> "$OUTPUT"
# Process Glossary (Alphabetical)
for file in $(ls "$GLOSSARY_DIR"/*.md | sort); do
    TITLE=$(grep "^title:" "$file" | head -1 | sed 's/title: //;s/"//g' | sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g')
    echo -e "### $TITLE\n" >> "$OUTPUT"
    # Append body content: skip first two frontmatter dashes, absolute URLs, sanitize symbols/umlauts
    awk 'BEGIN{c=0} /^---$/ && c<2 {c++; next} c>=2 {print}' "$file" | \
    sed 's/<[^>]*>//g' | \
    sed -E "s|\]\((/[^)]*)\)|]($DOMAIN\1)|g" | \
    sed -E "s|\]\(\.\./\.\./|]($DOMAIN/|g" | \
    sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g' >> "$OUTPUT"
    echo -e "\n---\n" >> "$OUTPUT"
done

echo -e "## BLOG ARTICLES\n" >> "$OUTPUT"
# Process Blog (Newest first)
for file in $(ls "$BLOG_DIR"/*.md | sort -r); do
    TITLE=$(grep "^title:" "$file" | head -1 | sed 's/title: //;s/"//g' | sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g')
    echo -e "### $TITLE\n" >> "$OUTPUT"
    # Append body content: skip first two frontmatter dashes, absolute URLs, sanitize symbols/umlauts
    awk 'BEGIN{c=0} /^---$/ && c<2 {c++; next} c>=2 {print}' "$file" | \
    sed 's/<[^>]*>//g' | \
    sed -E "s|\]\((/[^)]*)\)|]($DOMAIN\1)|g" | \
    sed -E "s|\]\(\.\./\.\./|]($DOMAIN/|g" | \
    sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g' >> "$OUTPUT"
    echo -e "\n---\n" >> "$OUTPUT"
done

echo "llms-full.txt updated successfully with absolute URLs and sanitized German characters."
