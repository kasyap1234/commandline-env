const path = require('path');

// Define the path to the configuration file
const configFilePath = path.join(__dirname, 'config.json');

// Other configuration constants
const encryptionKey = 'your-secret-key'; // Replace with your actual encryption key

module.exports = { configFilePath, encryptionKey };
