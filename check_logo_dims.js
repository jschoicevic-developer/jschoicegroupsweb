const sharp = require('sharp');
const path = require('path');

async function checkDims() {
    try {
        const metadata = await sharp('public/JCGLogo.png').metadata();
        console.log(`Width: ${metadata.width}, Height: ${metadata.height}`);
    } catch (err) {
        console.error(err);
    }
}

checkDims();
