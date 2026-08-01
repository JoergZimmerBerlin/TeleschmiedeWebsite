import os
import re

dirs = ['src/content/blog', 'src/content/glossar']
files_to_check = []

for d in dirs:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith('.md'):
                files_to_check.append(os.path.join(root, f))

def get_headings(content):
    # Remove code blocks
    content_no_code = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
    content_no_code = re.sub(r'`[^`]*`', '', content_no_code)
    
    headings = []
    lines = content_no_code.split('\n')
    in_frontmatter = False
    
    for i, line in enumerate(lines):
        if i == 0 and line.startswith('---'):
            in_frontmatter = True
            continue
        if in_frontmatter and line.startswith('---'):
            in_frontmatter = False
            continue
            
        if not in_frontmatter:
            m = re.match(r'^(#{1,6})\s+(.*)', line.strip())
            if m:
                headings.append((len(m.group(1)), m.group(2)))
    return headings

for path in files_to_check:
    headings = get_headings(open(path).read())
    if not headings: continue
    
    levels = [h[0] for h in headings]
    
    # Check if there's an H1 in the body
    has_h1 = 1 in levels
    
    # Check for jumping (e.g. 1 -> 3, or 2 -> 4)
    jumps = []
    for i in range(len(levels)-1):
        if levels[i+1] > levels[i] + 1:
            jumps.append((levels[i], levels[i+1]))
            
    if has_h1 or jumps:
        print(f"File: {path}")
        if has_h1:
            print("  - Contains H1(s) in body!")
        if jumps:
            print(f"  - Heading jumps found: {jumps}")
        for h in headings:
            print(f"    {'#' * h[0]} {h[1]}")
        print("-" * 40)
