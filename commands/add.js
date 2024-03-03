
function addVariable(name, value, encryptionKey) {
    // Read the existing configuration file, if it exists
    let config = {};
    if (fs.existsSync(configFilePath)) {
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(configFileContent);
    }

    // Encrypt the sensitive value using the provided encryption key
    const encryptedData = encryptData(value, encryptionKey);

    // Add the new environment variable to the configuration
    config[name] = { value: encryptedData };

    // Write the updated configuration back to the file
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    console.log(`Added variable: ${name}`);
}
