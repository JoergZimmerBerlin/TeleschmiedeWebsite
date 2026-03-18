import os
import re

glossary_dir = 'src/content/glossar/'
assets_prefix = '../../assets/images/glossar/'

# Theme mapping with refined regex and priority.
themes = [
    # 1. Technical (Specific technical concepts)
    ('glossar-theme-technical.png', [
        r'\bpagespeed\b', r'\bcrawling\b', r'\bindexing\b', r'\bcanonical\b', 
        r'\bsitemap\b', r'\brobots\.txt\b', r'\bcore-web-vitals\b', 
        r'\bstructured-data\b', r'\bschema-org\b', r'\bmarkup\b', 
        r'\bssl\b', r'\btrailing\b', r'\bslashes\b', r'\bredirect\b'
    ]),
    # 2. Local
    ('glossar-theme-local.png', [
        r'\bmaps\b', r'\bgoogle-business-profile\b', r'\bcitations\b', 
        r'\bnap\b', r'\bstadtportale\b', r'\blocal-seo\b'
    ]),
    # 3. E-E-A-T
    ('glossar-theme-eeat.png', [
        r'\be-e-a-t\b', r'\bexpertise\b', r'\btrust\b', r'\bexperience\b', 
        r'\bauthoritative\b', r'\bauthentizitaet\b', r'\bzitierfaehig\b'
    ]),
    # 4. Linking
    ('glossar-theme-linking.png', [
        r'\blinkbuilding\b', r'\bbacklinks?\b', r'\blinkjuice\b', r'\banchor\b'
    ]),
    # 5. AI & GEO
    ('glossar-theme-ai-geo.png', [
        r'\bgeo\b', r'\bllm\b', r'\bai\b', r'\bki\b', r'\bchatgpt\b', r'\bperplexity\b', 
        r'\bgenerative\b', r'\bbert\b', r'\brankbrain\b', r'\baeo\b'
    ]),
    # 6. Content & UX
    ('glossar-theme-content-ux.png', [
        r'\bux\b', r'\busability\b', r'\bwriting\b', r'\bcopywriting\b', 
        r'\bintent\b', r'\bcluster\b', r'\buser-experience\b', 
        r'\bzero-click\b', r'\bconversion-rate\b'
    ]),
    # 7. Strategy (Broadest)
    ('glossar-theme-strategy.png', [
        r'\bstrategy\b', r'\baudit\b', r'\bberatung\b', r'\bcoaching\b', r'\bconsulting\b', 
        r'\bgrowth\b', r'\broi\b', r'\bkpi\b', r'\btracking\b', r'\banalytics\b'
    ])
]

# Terms that have their own dedicated high-quality images
exclusions = [
    'suchvolumen.md',
    'keywoerter.md',
    'money-keyword.md',
    'sichtbarkeit.md'
]

def get_theme_for_file(filename, content):
    text = (filename + " " + content).lower()
    for theme_img, patterns in themes:
        for pattern in patterns:
            if re.search(pattern, text):
                return theme_img
    return 'glossar-theme-strategy.png'

def update_glossary_images():
    for filename in os.listdir(glossary_dir):
        if filename.endswith('.md') and filename not in exclusions:
            filepath = os.path.join(glossary_dir, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            theme_img = get_theme_for_file(filename, content)
            new_image_path = f'{assets_prefix}{theme_img}'
            image_line_pattern = r'image: ".*?"|image: [^\n]+'
            new_image_line = f'image: "{new_image_path}"'
            new_content = re.sub(image_line_pattern, new_image_line, content)
            if content != new_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename} with {theme_img}")

if __name__ == "__main__":
    update_glossary_images()
