#!/usr/bin/env node

const { program } = require('commander');
const addVariable = require('./commands/add');
const updateVariable = require('./commands/update');
const deleteVariable = require('./commands/delete');
const listVariables = require('./commands/list');


program
  .version('1.0.0')
  .description('A CLI tool for managing environment variables with encryption');

// Define the 'add' command
program
  .command('add <name> <value>')
  .description('Add a new environment variable')
  .action((name, value) => {
    addVariable(name, value);
  });

// Define the 'update' command
program
  .command('update <name> <value>')
  .description('Update an existing environment variable')
  .action((name, value) => {
    updateVariable(name, value);
  });


program
  .command('delete <name>')
  .description('Delete an environment variable')
  .action((name) => {
    deleteVariable(name);
  });

// Define the 'list' command
program
  .command('list')
  .description('List all environment variables')
  .action(() => {
    listVariables();
  });

// Parse command-line arguments
program.parse(process.argv);
