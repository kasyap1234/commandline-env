// File: commands/delete.js

const fs = require('fs');
const path = require('path');

function deleteVariable(name, encryptionKey) {
    const envFilePath = path.join(__dirname, '..', 'env.json'); // Adjust the path as necessary
    if (fs.existsSync(envFilePath)) {
        const envData = JSON.parse(fs.readFileSync(envFilePath, 'utf8'));
        if (envData.hasOwnProperty(name)) {
            delete envData[name];
            fs.writeFileSync(envFilePath, JSON.stringify(envData, null, 2), 'utf8');
            console.log(`Environment variable '${name}' deleted successfully.`);
        } else {
            console.error(`Error: Environment variable '${name}' does not exist).`);
        }
    } else {
        console.log('No environment variables found.');
    }
}

module.exports = { deleteVariable };

