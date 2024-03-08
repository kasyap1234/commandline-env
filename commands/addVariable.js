// File: commands/add.js

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

async function addVariable(name, value, encryptionKey) {
    if (!encryptionKey || !Buffer.isBuffer(encryptionKey)) {
        throw new Error('Encryption key is not defined or is not a Buffer.');
    }

    // Encrypt the value using the provided encryption key
    const iv = crypto.randomBytes(16); // Generate a new initialization vector
    const cipher = crypto.createCipheriv('aes-256-gcm', encryptionKey, iv);
    let encryptedValue = cipher.update(value, 'utf8', 'hex');
    encryptedValue += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');

    // Load existing environment variables
    let envData = {};
    if (fs.existsSync(envFilePath)) {
        envData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
    }

    envData[name] = { value: encryptedValue, iv: iv.toString('hex'), tag };
    fs.writeFileSync(envFilePath, JSON.stringify(envData, null, 2), 'utf8');
    console.log(`Environment variable '${name}' added successfully.`);
}

module.exports = { addVariable };
