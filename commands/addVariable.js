// File: commands/add.js

const fs = require('fs');
const path = require('path');

async function addVariable(name, value, encryptionKey) {
    const envFilePath = path.join(__dirname, '..', 'env.json'); // Adjust the path as necessary
    let envData = {};
    if (fs.existsSync(envFilePath)) {
        envData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
    }
    envData[name] = value; // Add the new environment variable
    fs.writeFileSync(envFilePath, JSON.stringify(envData, null, 2), 'utf8');
    console.log(`Environment variable '${name}' added successfully.`);
}

module.exports = { addVariable };