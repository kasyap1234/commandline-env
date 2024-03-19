// // File: commands/delete.js

// const fs = require('fs');
// const path = require('path');

// function deleteVariable(name, encryptionKey) {
//     const envFilePath = path.join(__dirname, '..', '.env.json'); // Adjust the path as necessary
//     if (fs.existsSync(envFilePath)) {
//         const envData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
//         if (envData.hasOwnProperty(name)) {
//             delete envData[name];
//             fs.writeFileSync(envFilePath, JSON.stringify(envData, null, 2), 'utf8');
//             console.log(`Environment variable '${name}' deleted successfully.`);
//         } else {
//             console.error(`Error: Environment variable '${name}' does not exist).`);
//         }
//     } else {
//         console.log('No environment variables found.');
//     }
// }

// module.exports = { deleteVariable };

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function deleteVariable(name, encryptionKey) {
    const envFilePath = path.join(__dirname, '..', '.env.json'); // Adjust the path as necessary
    const ivPath = path.join(__dirname, '..', '.encryptioniv.key'); // Adjust the path as necessary

    if (fs.existsSync(envFilePath) && fs.existsSync(ivPath)) {
        // Read the encrypted environment variables
        const encryptedEnv = fs.readFileSync(envFilePath, 'utf8');
        const iv = Buffer.from(fs.readFileSync(ivPath, 'utf8'), 'hex'); // Read the IV from the dotfile

        // Decrypt the environment variables
        const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);
        let decrypted = decipher.update(encryptedEnv, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        const envData = JSON.parse(decrypted);

        // Check if the environment variable exists and delete it
        if (envData.hasOwnProperty(name)) {
            delete envData[name];
            // Re-encrypt the environment variables
            const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);
            let encrypted = cipher.update(JSON.stringify(envData), 'utf8', 'hex');
            encrypted += cipher.final('hex');
            fs.writeFileSync(envFilePath, encrypted, 'utf8');
            console.log(`Environment variable '${name}' deleted successfully.`);
        } else {
            console.error(`Error: Environment variable '${name}' does not exist.`);
        }
    } else {
        console.log('No environment variables found.');
    }
}

module.exports = { deleteVariable };
