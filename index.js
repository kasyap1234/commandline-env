#!/usr/bin/env node
const { program } = require('commander');
const addVariable = require('./commands/add');
const listVariables = require('./commands/list');
const deleteVariable = require('./commands/delete');
const { deriveEncryptionKey } = require('./encryption');
const readline = require('readline');

async function getEncryptionKey() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question('Enter your password: ', async (password) => {
            rl.close();
            try {
                const encryptionKey = await deriveEncryptionKey(password);
                resolve(encryptionKey);
            } catch (error) {
                reject(error);
            }
        });
    });
}

// Define the 'add' command
program
    .command('add <name> <value>')
    .description('Add a new environment variable')
    .action(async (name, value) => {
        try {
            const encryptionKey = await getEncryptionKey();
            addVariable(name, value, encryptionKey);
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
            const encryptionKey = await getEncryptionKey();
            listVariables(encryptionKey);
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
            const encryptionKey = await getEncryptionKey();
            deleteVariable(name, encryptionKey);
        } catch (error) {
            console.error('Error:', error);
        }
    });

// Parse command-line arguments
program.parse(process.argv);

