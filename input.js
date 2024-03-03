// File: input.js

const readline = require('readline');
const { deriveEncryptionKey } = require('./encryption');

let encryptionKey = null; // Store the encryption key for reuse

async function authorizeUser() {
    if (!encryptionKey) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve, reject) => {
            rl.question('Enter your password: ', async (password) => {
                rl.close();
                try {
                    encryptionKey = await deriveEncryptionKey(password);
                    resolve(encryptionKey);
                } catch (error) {
                    reject(error);
                }
            });
        });
    } else {
        return encryptionKey;
    }
}

module.exports = { authorizeUser };