import os
from PIL import Image

def convert_to_webp(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                file_name, file_ext = os.path.splitext(file)
                webp_path = os.path.join(root, f"{file_name}.webp")
                
                try:
                    with Image.open(file_path) as img:
                        img.save(webp_path, 'WEBP')
                        print(f"Converted {file} to {file_name}.webp")
                    # Optional: Remove original file
                    # os.remove(file_path)
                except Exception as e:
                    print(f"Failed to convert {file}: {e}")

if __name__ == "__main__":
    target_dir = os.path.join(os.getcwd(), 'public', 'images', 'home')
    convert_to_webp(target_dir)
