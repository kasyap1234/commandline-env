const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { encryptPassword } = require('../user-password'); // Adjust the path as necessary

async function addVariable(name, value, encryptionKey) {
    const envFilePath = path.join(__dirname, '..', '.env.json'); // Adjust the path as necessary
    let envData = {};
    if (fs.existsSync(envFilePath)) {
        const encryptedEnv = fs.readFileSync(envFilePath, 'utf8');
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, Buffer.from('1234567890123456', 'hex'));
        let decrypted = decipher.update(encryptedEnv, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        envData = JSON.parse(decrypted);
    }
    envData[name] = value; // Add the new environment variable
    const encryptedEnv = encryptPassword(JSON.stringify(envData), encryptionKey); // Encrypt the updated envData
    fs.writeFileSync(envFilePath, encryptedEnv, 'utf8');
    console.log(`Environment variable '${name}' added successfully.`);
}

module.exports = { addVariable };