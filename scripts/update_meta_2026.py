import os
import re

MAX_TITLE_LEN = 55
MAX_DESC_LEN = 150
APPEND_STR = " (2026)"
TRUNCATE_SUFFIX = "..."

def update_text(text, max_len):
    if "2026" in text:
        return text
        
    if len(text) + len(APPEND_STR) <= max_len:
        return text + APPEND_STR
        
    # Need to truncate
    target_len = max_len - len(APPEND_STR) - len(TRUNCATE_SUFFIX) - 1 # 1 for space
    
    # Don't truncate if it would be absurdly short
    if target_len < 15:
        # Just append it anyway and let it be a bit over limit, 
        # better than destroying the keyword.
        return text + APPEND_STR
        
    # Truncate at the last space within target_len
    truncated = text[:target_len]
    if ' ' in truncated:
        truncated = truncated.rsplit(' ', 1)[0]
    
    # Clean up trailing punctuation if any before adding ...
    truncated = re.sub(r'[,;\.\-\:]+$', '', truncated).strip()
    
    return f"{truncated} {TRUNCATE_SUFFIX}{APPEND_STR}"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    ext = os.path.splitext(filepath)[1].lower()

    if ext == '.md':
        # Match frontmatter title and description
        def replacer(match):
            key = match.group(1)
            quote = match.group(2)
            val = match.group(3)
            limit = MAX_TITLE_LEN if key == 'title' else MAX_DESC_LEN
            new_val = update_text(val, limit)
            if val != new_val:
                print(f"[{filepath}] {key} updated: \n  Old ({len(val)}): {val}\n  New ({len(new_val)}): {new_val}\n")
            return f"{key}: {quote}{new_val}{quote}"
            
        # We only want to replace in frontmatter, but a global replace on ^title: "..." is safe enough
        # since it's very strict.
        content = re.sub(r'^(title|description):\s*(["\'])(.*?)\2', replacer, content, flags=re.MULTILINE)

    elif ext == '.astro':
        # Match HTML-like attributes title="..." and description="..."
        def replacer(match):
            key = match.group(1)
            quote = match.group(2)
            val = match.group(3)
            limit = MAX_TITLE_LEN if key == 'title' else MAX_DESC_LEN
            new_val = update_text(val, limit)
            if val != new_val:
                print(f"[{filepath}] {key} updated: \n  Old ({len(val)}): {val}\n  New ({len(new_val)}): {new_val}\n")
            return f"{key}={quote}{new_val}{quote}"
            
        content = re.sub(r'\b(title|description)\s*=\s*(["\'])(.*?)\2', replacer, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

def main():
    base_dirs = [
        "src/content",
        "src/pages"
    ]
    
    for base_dir in base_dirs:
        if not os.path.exists(base_dir):
            continue
            
        for root, _, files in os.walk(base_dir):
            for file in files:
                if file.endswith('.md') or file.endswith('.astro'):
                    process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
