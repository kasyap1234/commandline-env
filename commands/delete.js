// delete.js

const fs = require('fs');
const path = require('path');
const { configFilePath } = require('../config');

function deleteVariable(name) {
    // Read the existing configuration file, if it exists
    let config = {};
    if (fs.existsSync(configFilePath)) {
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(configFileContent);
    }

    // Delete the environment variable if it exists
    if (config.hasOwnProperty(name)) {
        delete config[name];
        // Write the updated configuration back to the file
        fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
        console.log(`Deleted variable: ${name}`);
    } else {
        console.log(`Variable ${name} does not exist`);
    }
}

module.exports = deleteVariable;
