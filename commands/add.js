// add.js

const fs = require('fs');
const path = require('path');
const { encrypt } = require('../encryption');
const { configFilePath } = require('../config');

function addVariable(name, value) {
    // Read the existing configuration file, if it exists
    let config = {};
    if (fs.existsSync(configFilePath)) {
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(configFileContent);
    }

    // Encrypt the sensitive value
    const { iv, encryptedData } = encrypt(value);

    // Add the new environment variable and its IV to the configuration
    config[name] = { value: encryptedData, iv };

    // Write the updated configuration back to the file
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    console.log(`Added variable: ${name}=${value}`);
}

module.exports = addVariable;
