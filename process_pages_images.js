const https = require('https');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesByCategory = {
    community: [
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img25.png', name: 'img25.png', webp: 'img25.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img26.png', name: 'img26.png', webp: 'img26.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img27.png', name: 'img27.png', webp: 'img27.webp' }
    ],
    'allied-health': [
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img32.png', name: 'img32.png', webp: 'img32.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img33.png', name: 'img33.png', webp: 'img33.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/09/img35.png', name: 'img35.png', webp: 'img35.webp' }
    ],
    'daily-life': [
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/daily-living-img01.jpg', name: 'daily-living-img01.jpg', webp: 'daily-living-img01.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/daily-living-img02.jpg', name: 'daily-living-img02.jpg', webp: 'daily-living-img02.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/daily-living-img03.jpg', name: 'daily-living-img03.jpg', webp: 'daily-living-img03.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/daily-living-img04.jpg', name: 'daily-living-img04.jpg', webp: 'daily-living-img04.webp' }
    ],
    nursing: [
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/nursing-care-img01.jpeg', name: 'nursing-care-img01.jpeg', webp: 'nursing-care-img01.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/nursing-care-img02.jpg', name: 'nursing-care-img02.jpg', webp: 'nursing-care-img02.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/nursing-care-img03.jpg', name: 'nursing-care-img03.jpg', webp: 'nursing-care-img03.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/nursing-care-img04.jpg', name: 'nursing-care-img04.jpg', webp: 'nursing-care-img04.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2024/08/nursing-care-img05.jpg', name: 'nursing-care-img05.jpg', webp: 'nursing-care-img05.webp' }
    ],
    blog: [
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2026/02/the-role-of-support-workers-in-ndis-short-term-accommodation-support.png', name: 'blog-1.png', webp: 'blog-1.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2026/01/Support-Coordinator-Geelong.png', name: 'blog-2.png', webp: 'blog-2.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2026/01/How-Quality-NDIS-Providers-Improve-Long-Term-Participant-Outcomes.png', name: 'blog-3.png', webp: 'blog-3.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2025/12/Untitled-design-6.png', name: 'blog-4.png', webp: 'blog-4.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2025/12/How-Can-an-NDIS-Habit-Coach-Help-You-Build-a-Better-Routine--672x372.png', name: 'blog-5.png', webp: 'blog-5.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2025/11/Untitled-design-1.png', name: 'blog-6.png', webp: 'blog-6.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2025/11/myth-busting-what-allied-health-assistants-really-do.png', name: 'blog-7.png', webp: 'blog-7.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2025/10/Role-of-Support-Workers-in-NDIS-Emergency-Respite-Care-A-Short-Discussion.png', name: 'blog-8.png', webp: 'blog-8.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2025/10/When-Do-Participants-or-Carers-Need-Emergency-Respite-Services-.png', name: 'blog-9.png', webp: 'blog-9.webp' },
        { url: 'https://jschoicegroup.com.au/wp-content/uploads/2025/09/The-Role-of-a-Support-Worker-Beyond-Everyday-Assistance.png', name: 'blog-10.png', webp: 'blog-10.webp' }
    ]
};

async function processImages() {
    for (const [category, images] of Object.entries(imagesByCategory)) {
        const destDir = path.join(__dirname, 'public', 'images', category);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        for (const img of images) {
            const filePath = path.join(destDir, img.name);
            const webpPath = path.join(destDir, img.webp);

            await new Promise((resolve, reject) => {
                const file = fs.createWriteStream(filePath);
                https.get(img.url, function (response) {
                    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                        // Handle potential redirect
                        https.get(response.headers.location, function (redirectResponse) {
                            redirectResponse.pipe(file);
                            file.on('finish', () => file.close(resolve));
                        }).on('error', reject);
                    } else if (response.statusCode === 200) {
                        response.pipe(file);
                        file.on('finish', () => file.close(resolve));
                    } else {
                        console.error(`Status ${response.statusCode} for ${img.url}`);
                        file.close(resolve); // proceed anyway
                    }
                }).on('error', function (err) {
                    console.error(`Error downloading ${img.url}:`, err);
                    reject(err);
                });
            });

            if (fs.existsSync(filePath)) {
                try {
                    await sharp(filePath).toFile(webpPath);
                    console.log(`Processed: ${category}/${img.webp}`);
                    fs.unlinkSync(filePath);
                } catch (err) {
                    console.error(`Error converting ${category}/${img.name}:`, err.message);
                }
            }
        }
    }
}

processImages();
