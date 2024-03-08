// File: commands/list.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function listVariable(encryptionKey) {
    const envFilePath = path.join(__dirname, '..', 'env.json'); // Adjust the path as necessary
    if (fs.existsSync(envFilePath)) {
        const envData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
        console.log('Environment Variables:');
        for (const [key, encryptedData] of Object.entries(envData)) {
            // Check if the encryptedData is in the expected format
            if (encryptedData && typeof encryptedData === 'object' && encryptedData.value && encryptedData.iv && encryptedData.tag) {
                try {
                    // Decrypt the value using the provided encryption key
                    const decipher = crypto.createDecipheriv('aes-256-gcm', encryptionKey, Buffer.from(encryptedData.iv, 'hex'));
                    decipher.setAuthTag(Buffer.from(encryptedData.tag, 'hex'));
                    let decryptedValue = decipher.update(encryptedData.value, 'hex', 'utf8');
                    decryptedValue += decipher.final('utf8');

                    console.log(`${key}: ${decryptedValue}`);
                } catch (error) {
                    console.error(`Error decrypting value for '${key}':`, error.message);
                }
            } else {
                console.log(`${key}: ${encryptedData}`); // If not encrypted, print as is
            }
        }
    } else {
        console.log('No environment variables found.');
    }
}

module.exports = { listVariable };
