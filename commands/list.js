function listVariables(encryptionKey) {
    // Read the existing configuration file, if it exists
    let config = {};
    if (fs.existsSync(configFilePath)) {
        const configFileContent = fs.readFileSync(configFilePath, 'utf8');
        config = JSON.parse(configFileContent);
    }

    // List all environment variables
    Object.entries(config).forEach(([name, data]) => {
        const decryptedValue = decryptData(data.value, encryptionKey);
        console.log(`${name}=${decryptedValue}`);
    });
}
