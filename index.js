#!/usr/bin/env node
const {generateHashedPassword, verifyPassword} = require('./user-password');
const { program } = require('commander');
const readline = require('readline');
const bcrypt = require('bcrypt');
const addVariable = require('./commands/add');
const updateVariable = require('./commands/update');
const deleteVariable = require('./commands/delete');
const listVariables = require('./commands/list');

// Define version number and description for your CLI tool
program
  .version('1.0.0')
  .description('A CLI tool for managing environment variables with encryption');

// Define the 'add' command
program
  .command('add <name> <value>')
  .description('Add a new environment variable')
  .action((name, value) => {
    getPasswordAndProceed((password) => {
      addVariable(name, value, password);
    });
  });

// Define the 'update' command
program
  .command('update <name> <value>')
  .description('Update an existing environment variable')
  .action((name, value) => {
    getPasswordAndProceed((password) => {
      updateVariable(name, value, password);
    });
  });

// Define the 'delete' command
program
  .command('delete <name>')
  .description('Delete an environment variable')
  .action((name) => {
    getPasswordAndProceed((password) => {
      deleteVariable(name, password);
    });
  });

// Define the 'list' command
program
  .command('list')
  .description('List all environment variables')
  .action(() => {
    getPasswordAndProceed((password) => {
      listVariables(password);
    });
  });

// Parse command-line arguments
program.parse(process.argv);

/**
 * Prompt the user for a password.
 * @param {Function} callback Callback function to execute with the entered password.
 */
async function getPasswordAndProceed(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter your password: ', async (password) => {
    try {
      rl.close();

      // Generate hashed password
      const hashedPassword = await generateHashedPassword(password);
      
      // Verify the password
      const isPasswordValid = await verifyPassword(password, hashedPassword);
      
      if (isPasswordValid) {
        // Callback with the plain password and hashed password
        callback(password, hashedPassword);
      } else {
        console.error('Invalid password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
}


