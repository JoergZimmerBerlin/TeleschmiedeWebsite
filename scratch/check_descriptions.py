import os

def check_missing_desc(folder):
    missing = []
    for f in os.listdir(folder):
        if not f.endswith('.md'): continue
        with open(os.path.join(folder, f), 'r') as file:
            content = file.read()
            if '\ndescription:' not in content:
                missing.append(f)
    return missing

print("Blog missing:")
for m in check_missing_desc('src/content/blog'): print(m)
print("Glossar missing:")
for m in check_missing_desc('src/content/glossar'): print(m)
