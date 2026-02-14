const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const images = [
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/footer-logo-img.png', name: 'logo' },
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/footer-fb-img.png', name: 'facebook' },
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/footer-insta-img.png', name: 'instagram' },
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/footer-ndis-img.png', name: 'ndis' },
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/footer-call-img.png', name: 'call' },
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/footer-email-img.png', name: 'email' },
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/footer-loc-img.png', name: 'location' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/10/locpp_ico.png', name: 'po-box' },
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/footer-clock-img.png', name: 'clock' },
    { url: 'https://jschoicegroup.com.au/wp-content/themes/js_choice_group/images/acknowledgement-img.png', name: 'acknowledgement' }
];

const downloadImage = (url, filepath) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const stream = fs.createWriteStream(filepath);
                res.pipe(stream);
                stream.on('finish', () => {
                    stream.close();
                    resolve(filepath);
                });
            } else {
                reject(new Error(`Failed to download ${url}, status: ${res.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
};

const processImages = async () => {
    const outputDir = path.join(__dirname, 'public/images/footer');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const image of images) {
        try {
            const tempPath = path.join(outputDir, `${image.name}.png`);
            await downloadImage(image.url, tempPath);
            console.log(`Downloaded ${image.name}`);

            const webpPath = path.join(outputDir, `${image.name}.webp`);
            await sharp(tempPath)
                .webp({ quality: 80 })
                .toFile(webpPath);
            console.log(`Converted ${image.name} to WebP`);

            fs.unlinkSync(tempPath); // Remove original
        } catch (error) {
            console.error(`Error processing ${image.name}:`, error);
        }
    }
};

processImages();
