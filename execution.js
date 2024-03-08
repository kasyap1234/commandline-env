const { addVariable } = require('./commands/addVariable');
const { listVariable} = require('./commands/listVariable');
const { deleteVariable } = require('./commands/deleteVariable');
const { updateVariable } = require('./commands/updateVariable');

async function executeCommand(command, name, value, encryptionKey) {
    switch (command) {
        case 'add':
            addVariable(name, value, encryptionKey);
            break;
        case 'list':
            listVariable(encryptionKey);
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
module.exports={executeCommand};
