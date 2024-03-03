// File: commands/list.js

const fs = require('fs');
const path = require('path');

function listVariables(encryptionKey) {
    const envFilePath = path.join(__dirname, '..', 'env.json'); // Adjust the path as necessary
    if (fs.existsSync(envFilePath)) {
        const envData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
        console.log('Environment Variables:');
        for (const [key, value] of Object.entries(envData)) {
            console.log(`${key}: ${value}`);
        }
    } else {
        console.log('No environment variables found.');
    }
}

module.exports = { listVariables };