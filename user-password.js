
const crypto = require("crypto");
const fs = require("fs");

function encryptPassword(password) {
+    console.log('Encrypting password...');
    const algorithm = 'aes-256-cbc';
    const key = crypto.randomBytes(32); // Generate a secure random key
    const iv = crypto.randomBytes(16); // Generate a secure random IV
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');
+    console.log('Encryption key:', key.toString('hex'));
+    console.log('Encryption IV:', iv.toString('hex'));
    // Store the key and IV securely, e.g., in environment variables or a secure key management system
    fs.writeFileSync('encryptionKey.key', key.toString('hex'));
    fs.writeFileSync('encryptioniv.key', iv.toString('hex'));
+    console.log('Encrypted password:', encrypted);
    return encrypted;
}

function storeEncryptedPassword(password) {
+    console.log('Storing encrypted password...');
    const encryptedPassword = encryptPassword(password);
    fs.writeFileSync('encryptedPassword.txt', encryptedPassword);
}

function deriveEncryptionKeyFromPassword(encryptedPassword) {
+    console.log('Deriving encryption key from password...');
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(fs.readFileSync('encryptionKey.key', 'utf8'), 'hex');
    const iv = Buffer.from(fs.readFileSync('encryptioniv.key', 'utf8'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    let salt;
    if (fs.existsSync('salt.key')) {
        salt = Buffer.from(fs.readFileSync('salt.key', 'utf8'), 'hex');
+        console.log('Existing salt:', salt.toString('hex'));
    } else {
        salt = crypto.randomBytes(16);
        fs.writeFileSync('salt.key', salt.toString('hex'));
+        console.log('Generated salt:', salt.toString('hex'));
    }
    const iterations = 1000000;
    const keyLength = 32;
    const derivedKey = crypto.pbkdf2Sync(decrypted, salt, iterations, keyLength, 'sha256');
+    console.log('Derived key:', derivedKey.toString('hex'));
    return derivedKey;
}

module.exports = { storeEncryptedPassword, deriveEncryptionKeyFromPassword, encryptPassword };
