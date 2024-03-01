// list.js

const fs = require('fs');
const { decrypt } = require('../encryption');
const { configFilePath } = require('../config');

function listVariables() {
    // Read the existing configuration file, if it exists
    let config = {};
    if (fs.existsSync(configFilePath)) {
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(configFileContent);
    }

    // List all environment variables
    Object.entries(config).forEach(([name, data]) => {
        const decryptedValue = decrypt(data.value, data.iv);
        console.log(`${name}=${decryptedValue}`);
    });
}

module.exports = listVariables;
