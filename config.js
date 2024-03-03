// config.js

const fs = require('fs');
const { decryptData } = require('./encryption');

async function loadSecretKey(password) {
 // Retrieve the salt securely (this is a placeholder function)
 const salt = await getSaltFromSecureStorage();

 // Read the encrypted secret key from the file
 const encryptedSecretKey = fs.readFileSync('config.enc', 'utf8');
 
 // Decrypt the secret key using the provided password and salt
 const decryptedSecretKey = decryptData(encryptedSecretKey, password, salt);

 return decryptedSecretKey;
}
module.exports = {
  loadSecretKey: loadSecretKey
};

