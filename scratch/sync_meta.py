import os

content_dirs = [
    'src/content/blog',
    'src/content/glossar'
]

all_files = []
for d in content_dirs:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith('.md') or f.endswith('.mdx'):
                all_files.append(os.path.join(root, f))

for file_path in all_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    lines = content.split('\n')
    new_lines = []
    
    description = None
    has_meta_desc = False
    
    # First pass to find description
    for line in lines:
        if line.startswith("description:"):
            # extract string
            parts = line.split(":", 1)
            if len(parts) > 1:
                val = parts[1].strip()
                if val.startswith('"') and val.endswith('"'):
                    description = val[1:-1]
                elif val.startswith("'") and val.endswith("'"):
                    description = val[1:-1]
                else:
                    description = val
        if line.startswith("meta_description:"):
            has_meta_desc = True
            
    if not description:
        continue
        
    changed = False
    
    # Rebuild lines
    for i, line in enumerate(lines):
        if line.startswith("meta_description:"):
            # Update it
            new_lines.append(f'meta_description: "{description}"')
            changed = True
        elif line.startswith("description:"):
            new_lines.append(line)
            if not has_meta_desc:
                new_lines.append(f'meta_description: "{description}"')
                changed = True
        else:
            new_lines.append(line)
            
    if changed:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write('\n'.join(new_lines))
        print(f"Synced meta_description for {file_path}")
