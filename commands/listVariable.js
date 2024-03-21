
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function listVariable(encryptionKey) {
    const envFilePath = path.join(__dirname, '..', '.env.json'); // Adjust the path as necessary
    if (fs.existsSync(envFilePath)) {
        const encryptedEnv = fs.readFileSync(envFilePath, 'utf8');
        const iv = Buffer.from(fs.readFileSync('.encryptioniv.key', 'utf8'), 'hex'); // Read the IV from the dotfile
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
        let decrypted = decipher.update(encryptedEnv, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        const envData = JSON.parse(decrypted);

        console.log('Environment Variables:');
        for (const [key, value] of Object.entries(envData)) {
            console.log(`${key}: ${value}`);
        }
    } else {
        console.log('No environment variables found.');
    }
}

module.exports = { listVariable };