const readline = require('readline');
const { encryptPassword, storeEncryptedPassword, deriveEncryptionKeyFromPassword } = require('./user-password');

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
                    // Encrypt the password and store it
                    const encryptedPassword = encryptPassword(password);
                    storeEncryptedPassword(encryptedPassword);

                    // Derive the encryption key from the encrypted password
                    encryptionKey = await deriveEncryptionKeyFromPassword(encryptedPassword);
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