import os
import re

assets_dir = "/Users/alexcapellan/Library/Mobile Documents/com~apple~CloudDocs/99Designs/Code/BladderGenix/assets"

for filename in os.listdir(assets_dir):
    if filename.endswith(".svg"):
        filepath = os.path.join(assets_dir, filename)
        with open(filepath, "r") as f:
            content = f.read()
        
        # Check if it has preserveAspectRatio="none"
        if 'preserveAspectRatio="none"' in content:
            # Find viewBox
            match = re.search(r'viewBox="0 0 ([\d\.]+) ([\d\.]+)"', content)
            if match:
                w, h = match.groups()
                # Replace the string
                content = re.sub(
                    r'preserveAspectRatio="none"\s+width="100%"\s+height="100%"',
                    f'width="{w}" height="{h}"',
                    content
                )
                
                with open(filepath, "w") as f:
                    f.write(content)
                print(f"Fixed {filename} with width={w} height={h}")

