const readline = require('readline');
const { deriveEncryptionKey } = require('./encryption');

async function authorizeUser() {
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