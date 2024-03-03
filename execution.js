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
        case 'update':
            updateVariable(name, value, encryptionKey);
            break;
       
        default:
            console.log('Unknown command');
    }
}
