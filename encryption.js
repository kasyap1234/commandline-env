const crypto = require('crypto');
const algorithm = 'aes-256-cbc'; // You can choose a suitable algorithm

// Encryption function
function encrypt(data, key) {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
}

// Decryption function
function decrypt(encryptedData, key, iv) {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}