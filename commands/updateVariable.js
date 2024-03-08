// File: commands/update.js

const fs = require('fs');
const path = require('path');

function updateVariable(name, newValue, encryptionKey) {
    const envFilePath = path.join(__dirname, '..', 'env.json'); // Adjust the path as necessary
    if (fs.existsSync(envFilePath)) {
        const envData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
        if (envData.hasOwnProperty(name)) {
            envData[name] = newValue;
            fs.writeFileSync(envFilePath, JSON.stringify(envData, null, 2), 'utf8');
            console.log(`Environment variable '${name}' updated successfully.`);
        } else {
            console.error(`Error: Environment variable '${name}' does not exist.`);
        }
    } else {
        console.error('Error: Environment variables file not found.');
    }
}

module.exports = { updateVariable };