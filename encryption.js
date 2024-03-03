const crypto = require('crypto');
/**
 * Derive an encryption key from the user's password using PBKDF2.
 * @param {string} password The user's password.
 * @returns {Buffer} The derived encryption key.
 */
function deriveEncryptionKey(password) {
 // Use PBKDF2 to derive the encryption key from the password
 // The salt should be unique for each user and stored securely
 // The iteration count and key length can be adjusted for security
 const salt = crypto.randomBytes(16); // Example salt generation
 const iterations = 100000; // Recommended number of iterations
 const keyLength = 32; // Length of the derived key in bytes

 return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');
}

module.exports = {
 deriveEncryptionKey: deriveEncryptionKey,
 encryptData: encryptData,
 decryptData: decryptData
};
