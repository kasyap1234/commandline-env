#!/usr/bin/env node
const { program } = require('commander');
const {authorizeUser}=require('./input.js');
const {executeCommand}=require('./execution.js');


// Define the 'add' command
program
    .command('add <name> <value>')
    .description('Add a new environment variable')
    .action(async (name, value) => {
        try {
            const encryptionKey = await authorizeUser();
            executeCommand('add', name, value, encryptionKey);
            
        } catch (error) {
            console.error('Error:', error);
        }
    });
// Define the 'update' command
program
    .command('update <name> <newValue>')
    .description('Update an existing environment variable')
    .action(async (name, newValue) => {
        try {
            const encryptionKey = await authorizeUser();
            executeCommand('update', name, newValue, encryptionKey);
        } catch (error) {
            console.error('Error:', error);
        }
    });
// Define the 'list' command
program
    .command('list')
    .description('List all environment variables')
    .action(async () => {
        try {
            const encryptionKey = await authorizeUser();
            executeCommand('list', null, null, encryptionKey);
        } catch (error) {
            console.error('Error:', error);
        }
    });



// Define the 'delete' command
program
    .command('delete <name>')
    .description('Delete an environment variable')
    .action(async (name) => {
        try {
            const encryptionKey = await authorizeUser();
            executeCommand('delete', name, null, encryptionKey);
        } catch (error) {
            console.error('Error:', error);
        }
    });

// Parse command-line arguments
program.parse(process.argv);