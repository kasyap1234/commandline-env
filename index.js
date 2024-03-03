#!/usr/bin/env node
const { program } = require('commander');
const { authorizeUser, executeCommand } = require('./authorization');

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