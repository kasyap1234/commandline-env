
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
program
  .version('0.1.0')
  .description('A CLI tool for managing environment variables with encryption');



program.parse(process.argv);


program
  .command('add <name> <value>')
  .description('Add a new environment variable')
  .action((name, value) => {
    // Determine the path to the configuration file
    const configFilePath = path.join(process.cwd(), 'env-config.json');

    // Read the existing configuration file, if it exists
    let config = {};
    if (fs.existsSync(configFilePath)) {
      const configFileContent = fs.readFileSync(configFilePath, 'utf8');
      config = JSON.parse(configFileContent);
    }

    // Add the new environment variable to the configuration
    config[name] = value;

    // Encrypt sensitive data if necessary
    // (Assuming you have a function encrypt() for encryption)
    // For simplicity, let's assume all values are sensitive and need encryption
    Object.keys(config).forEach((key) => {
      config[key] = encrypt(config[key]);
    });

    // Write the updated configuration back to the file
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

    console.log(`Added variable: ${name}=${value}`);
  });
