import os
import glob
import re

directories = [
    "/Users/jorti/Documents/Antigravity/src/content/glossar",
    "/Users/jorti/Documents/Antigravity/src/content/blog"
]

def replace_links_in_html(match):
    html_content = match.group(0)
    # Replace [Text](/url/) with <a href="/url/" class="underline font-semibold text-lime-600 hover:text-lime-700">Text</a>
    # Negative lookbehind (?<!\!) to avoid matching images ![alt](url)
    # It also avoids replacing already fixed <a> tags since they don't match the [text](url) format.
    fixed_html = re.sub(
        r'(?<!\!)\[([^\]]+)\]\(([^)]+)\)',
        r'<a href="\2" class="underline font-semibold text-lime-600 hover:text-lime-700">\1</a>',
        html_content
    )
    return fixed_html

total_fixed = 0

for d in directories:
    for filepath in glob.glob(os.path.join(d, "*.md")):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
            
        # Match <div ...> ... </div> non-greedily across lines
        new_content = re.sub(
            r'<div\b[^>]*>.*?</div>',
            replace_links_in_html,
            content,
            flags=re.DOTALL
        )
        
        if new_content != content:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(new_content)
            total_fixed += 1

print(f"Fixed markdown links in HTML blocks across {total_fixed} files.")
