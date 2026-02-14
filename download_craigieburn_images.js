
const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const images = [
    {
        url: "https://jschoicegroup.com.au/wp-content/uploads/2025/12/ndis_provider_img.jpg",
        name: "ndis-provider-craigieburn-1.webp"
    },
    {
        url: "https://jschoicegroup.com.au/wp-content/uploads/2025/12/ndis_provider_img2.jpg",
        name: "ndis-provider-craigieburn-2.webp"
    },
    {
        url: "https://jschoicegroup.com.au/wp-content/uploads/2025/12/ndis_provider_img3.jpg",
        name: "ndis-provider-craigieburn-3.webp"
    }
];

const outputDir = path.join(__dirname, 'public/images/craigieburn');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const downloadImage = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
            }
            const data = [];
            res.on('data', (chunk) => data.push(chunk));
            res.on('end', () => resolve(Buffer.concat(data)));
            res.on('error', (err) => reject(err));
        }).on('error', (err) => reject(err));
    });
};

const processImages = async () => {
    for (const image of images) {
        try {
            console.log(`Downloading ${image.url}...`);
            const buffer = await downloadImage(image.url);
            console.log(`Converting to ${image.name}...`);
            await sharp(buffer)
                .webp({ quality: 80 })
                .toFile(path.join(outputDir, image.name));
            console.log(`Successfully saved ${image.name}`);
        } catch (error) {
            console.error(`Error processing ${image.url}:`, error);
        }
    }
};

processImages();
