
import requests
from PIL import Image
from io import BytesIO
import os

images = [
    {
        "url": "https://jschoicegroup.com.au/wp-content/uploads/2025/12/ndis_provider_img.jpg",
        "name": "ndis_provider_img.webp"
    },
    {
        "url": "https://jschoicegroup.com.au/wp-content/uploads/2025/12/ndis_provider_img2.jpg",
        "name": "ndis_provider_img2.webp"
    },
    {
        "url": "https://jschoicegroup.com.au/wp-content/uploads/2025/12/ndis_provider_img3.jpg",
        "name": "ndis_provider_img3.webp"
    }
]

output_dir = "public/images/south-morang"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for img in images:
    try:
        response = requests.get(img["url"], timeout=10)
        if response.status_code == 200:
            image = Image.open(BytesIO(response.content))
            image.save(os.path.join(output_dir, img["name"]), "webp", quality=80)
            print(f"Downloaded and converted: {img['name']}")
        else:
            print(f"Failed to download {img['url']}")
    except Exception as e:
        print(f"Error processing {img['url']}: {e}")
