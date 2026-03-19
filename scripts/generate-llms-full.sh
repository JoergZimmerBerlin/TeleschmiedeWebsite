#!/bin/bash

OUTPUT="public/llms-full.txt"
GLOSSARY_DIR="src/content/glossar"
BLOG_DIR="src/content/blog"

# Start with the main llms.txt content
cat public/llms.txt > "$OUTPUT"
echo -e "\n---\n" >> "$OUTPUT"
echo -e "# FULL KNOWLEDGE BASE\n" >> "$OUTPUT"

echo -e "## GLOSSARY\n" >> "$OUTPUT"
# Process Glossary (Alphabetical)
for file in $(ls "$GLOSSARY_DIR"/*.md | sort); do
    TITLE=$(grep "^title:" "$file" | head -1 | sed 's/title: //;s/"//g' | sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g')
    echo -e "### $TITLE\n" >> "$OUTPUT"
    # Append body content: skip frontmatter, strip HTML divs, replace umlauts
    sed '1,/---/d' "$file" | sed '1,/---/d' | \
    sed 's/<div[^>]*>//g;s/<\/div>//g' | \
    sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g' >> "$OUTPUT"
    echo -e "\n---\n" >> "$OUTPUT"
done

echo -e "## BLOG ARTICLES\n" >> "$OUTPUT"
# Process Blog (Newest first based on filename date if possible, otherwise just sort)
for file in $(ls "$BLOG_DIR"/*.md | sort -r); do
    TITLE=$(grep "^title:" "$file" | head -1 | sed 's/title: //;s/"//g' | sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g')
    echo -e "### $TITLE\n" >> "$OUTPUT"
    # Append body content: skip frontmatter, strip HTML divs, replace umlauts
    sed '1,/---/d' "$file" | sed '1,/---/d' | \
    sed 's/<div[^>]*>//g;s/<\/div>//g' | \
    sed 's/ö/oe/g;s/ä/ae/g;s/ü/ue/g;s/Ö/Oe/g;s/Ä/Ae/g;s/Ü/Ue/g;s/ß/ss/g' >> "$OUTPUT"
    echo -e "\n---\n" >> "$OUTPUT"
done

echo "llms-full.txt generated successfully."
