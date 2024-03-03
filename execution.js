const { addVariable, listVariables, deleteVariable } = require('./commands');

async function executeCommand(command, name, value, encryptionKey) {
    switch (command) {
        case 'add':
            addVariable(name, value, encryptionKey);
            break;
        case 'list':
            listVariables(encryptionKey);
            break;
        case 'delete':
            deleteVariable(name, encryptionKey);
            break;
        // Add 'update' command logic here if needed
        default:
            console.log('Unknown command');
    }
}