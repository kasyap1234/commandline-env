const crypto=require("crypto");
const fs=require("fs")
function encryptPassword(password){
  const algorithm='aes-256-cbc'
  const key=crypto.randomBytes(32)
  const iv=crypto.randomBytes(16)
  const cipher=crypto.createCipheriv(algorithm,key,iv)
  let encrypted=cipher.update(password,'utf8','hex')
  encrypted+=cipher.final('hex')
  fs.writeFileSync('encryptionKey.key',key.toString('hex'))
  fs.writeFileSync('encryptioniv.key',iv.toString('hex'))
  return encrypted
}

function storeEncryptedPassword(password){
  const encryptedPassword=encryptPassword(password)
  fs.writeFileSync('encryptedPassword.txt',encryptedPassword)
}

function deriveEncryptionKeyFromPassword(encryptedPassword){

  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(fs.readFileSync('encryptionKey.key', 'utf8'));
  const iv = Buffer.from(fs.readFileSync('encryptioniv.key', 'utf8'));
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
   const encryptionKey = deriveKeyFromDecryptedPassword(decrypted);

    return encryptionKey;
}
function deriveKeyFromDecryptedPassword(password) {
    // Implement the logic to derive an encryption key from the decrypted password
    // This could involve using PBKDF2 or another secure key derivation function
    // For example:
    const salt = crypto.randomBytes(16);
    const iterations = 100000;
    const keyLength = 32;
    const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256');

    return derivedKey;
}