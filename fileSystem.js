const fs = require('fs');
const path = require('path');
const { configFilePath } = require('./config');

// Function to read the configuration file
function readConfigFile() {
    let config = {};
    if (fs.existsSync(configFilePath)) {
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(configFileContent);
    }
    return config;
}

// Function to write to the configuration file
function writeConfigFile(config) {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
}

module.exports = { readConfigFile, writeConfigFile };
