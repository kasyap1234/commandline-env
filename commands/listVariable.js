// File: commands/list.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function listVariable(encryptionKey) {
    const envFilePath = path.join(__dirname, '..', '.env.json'); // Adjust the path as necessary
    if (fs.existsSync(envFilePath)) {
        const encryptedEnv = fs.readFileSync(envFilePath, 'utf8');
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, Buffer.from('1234567890123456', 'hex'));
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