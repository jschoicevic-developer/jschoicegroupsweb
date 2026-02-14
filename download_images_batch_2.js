const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const images = [
    // Transportation Assistance
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/transportation-assistance-img01.jpg', path: 'public/images/transport/transport-1.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/transportation-assistance-img02.jpg', path: 'public/images/transport/transport-2.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/transportation-assistance-img03.jpg', path: 'public/images/transport/transport-3.webp' },

    // Support Coordination
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img28.png', path: 'public/images/support-coordination/support-1.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img29.png', path: 'public/images/support-coordination/support-2.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/31.png', path: 'public/images/support-coordination/bg-1.webp' },

    // Psychosocial Recovery Coach
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/recovery-coach-img01.jpg', path: 'public/images/recovery-coach/coach-1.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/recovery-coach-img02.jpg', path: 'public/images/recovery-coach/coach-2.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/recovery-coach-img03.jpg', path: 'public/images/recovery-coach/coach-3.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/recovery-coach-img04.jpg', path: 'public/images/recovery-coach/coach-4.webp' },

    // NDIS Accommodation
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img46.png', path: 'public/images/accommodation/img46.webp' }, // STA + Main
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img47.png', path: 'public/images/accommodation/mta.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img48.png', path: 'public/images/accommodation/sil.webp' },

    // NDIS Access Requests
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img37.png', path: 'public/images/access-requests/access-1.webp' },

    // Innovative Community Participation
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img38.png', path: 'public/images/innovative/innovative-1.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img40.png', path: 'public/images/innovative/innovative-2.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img41.png', path: 'public/images/innovative/innovative-3.webp' },

    // Group / Centre Activities
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/group-centre-activities-img01.jpg', path: 'public/images/group-activities/group-1.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/group-centre-activities-img02.jpg', path: 'public/images/group-activities/group-2.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/group-centre-activities-img03.jpg', path: 'public/images/group-activities/group-3.webp' },

    // Emergency Respite
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/emergency-respite-img01.jpg', path: 'public/images/emergency-respite/respite-1.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/emergency-respite-img02.jpg', path: 'public/images/emergency-respite/respite-2.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/emergency-respite-img03.jpg', path: 'public/images/emergency-respite/respite-3.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/emergency-respite-img04.jpg', path: 'public/images/emergency-respite/respite-4.webp' },
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/emergency-respite-img05.jpg', path: 'public/images/emergency-respite/respite-5.webp' },

    // Client and Family Advocacy
    { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img36.png', path: 'public/images/advocacy/advocacy-1.webp' },
];

const downloadAndConvert = async (url, outputPath) => {
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode === 200) {
                const chunks = [];
                res.on('data', (chunk) => chunks.push(chunk));
                res.on('end', async () => {
                    const buffer = Buffer.concat(chunks);
                    try {
                        await sharp(buffer)
                            .webp({ quality: 80 })
                            .toFile(outputPath);
                        console.log(`Processed: ${outputPath}`);
                        resolve();
                    } catch (err) {
                        console.error(`Error converting ${url}:`, err);
                        reject(err);
                    }
                });
            } else {
                console.error(`Failed to download ${url}: Status ${res.statusCode}`);
                reject(new Error(`Status ${res.statusCode}`));
            }
        }).on('error', (err) => {
            console.error(`Error downloading ${url}:`, err);
            reject(err);
        });
    });
};

const processImages = async () => {
    for (const image of images) {
        try {
            await downloadAndConvert(image.url, image.path);
        } catch (err) {
            console.error(`Failed to process ${image.url}`);
        }
    }
};

processImages();
