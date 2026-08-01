import os
import re

def fix_missing_desc(folder):
    for f in os.listdir(folder):
        if not f.endswith('.md'): continue
        path = os.path.join(folder, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        if '\ndescription:' not in content:
            # Find meta_description
            m = re.search(r'\nmeta_description:\s*"(.*?)"', content)
            if m:
                desc = m.group(1)
                new_content = content.replace(m.group(0), f'\ndescription: "{desc}"{m.group(0)}')
                with open(path, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                print(f"Fixed {f}")
            else:
                print(f"No meta_desc in {f}")

fix_missing_desc('src/content/blog')
fix_missing_desc('src/content/glossar')
