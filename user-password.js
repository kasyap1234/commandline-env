
// const crypto = require("crypto");
// const fs = require("fs");

// function encryptPassword(password) {
//     const algorithm = 'aes-256-cbc';
//     let key, iv;

//     // Check if the key and IV files exist, if not, generate new ones
//     if (fs.existsSync('encryptionKey.key') && fs.existsSync('encryptioniv.key')) {
//         key = Buffer.from(fs.readFileSync('encryptionKey.key', 'utf8'), 'hex');
//         iv = Buffer.from(fs.readFileSync('encryptioniv.key', 'utf8'), 'hex');
//     } else {
//         key = crypto.randomBytes(32); // Generate a secure random key
//         iv = crypto.randomBytes(16); // Generate a secure random IV
//         fs.writeFileSync('encryptionKey.key', key.toString('hex'));
//         fs.writeFileSync('encryptioniv.key', iv.toString('hex'));
//     }

//     const cipher = crypto.createCipheriv(algorithm, key, iv);
//     let encrypted = cipher.update(password, 'utf8', 'hex');
//     encrypted += cipher.final('hex');

//     return encrypted;
// }
// const fs = require("fs");
// const crypto = require("crypto");

// // function generateEncryptionFiles() {
// //     const key = crypto.randomBytes(32); // Generate a secure random key
// //     const iv = crypto.randomBytes(16); // Generate a secure random IV
// //     const salt = crypto.randomBytes(16); // Generate a secure random salt

// //     // Write the files with restricted permissions
// //     fs.writeFileSync('.encryptionKey.key', key.toString('hex'), { mode: 0o600 });
// //     fs.writeFileSync('.encryptioniv.key', iv.toString('hex'), { mode: 0o600 });
// //     fs.writeFileSync('.salt.key', salt.toString('hex'), { mode: 0o600 });
// // }

// // Call this function to generate the files
// generateEncryptionFiles();


// function deriveEncryptionKeyFromPassword(encryptedPassword) {
//     const algorithm = 'aes-256-cbc';
//     const key = Buffer.from(fs.readFileSync('encryptionKey.key', 'utf8'), 'hex');
//     const iv = Buffer.from(fs.readFileSync('encryptioniv.key', 'utf8'), 'hex');
//     const decipher = crypto.createDecipheriv(algorithm, key, iv);
//     let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');

//     let salt;
//     if (fs.existsSync('salt.key')) {
//         salt = Buffer.from(fs.readFileSync('salt.key', 'utf8'), 'hex');
//     } else {
//         salt = crypto.randomBytes(16);
//         fs.writeFileSync('salt.key', salt.toString('hex'));
//     }
//     const iterations = 1000000;
//     const keyLength = 32;
//     const derivedKey = crypto.pbkdf2Sync(decrypted, salt, iterations, keyLength, 'sha256');
// }

// module.exports = { storeEncryptedPassword, deriveEncryptionKeyFromPassword, encryptPassword };

const fs = require("fs");
const crypto = require("crypto");

function generateEncryptionFiles() {
    const key = crypto.randomBytes(32); // Generate a secure random key
    const iv = crypto.randomBytes(16); // Generate a secure random IV
    const salt = crypto.randomBytes(16); // Generate a secure random salt

    // Write the files with restricted permissions
    fs.writeFileSync('.encryptionKey.key', key.toString('hex'), { mode: 0o600 });
    fs.writeFileSync('.encryptioniv.key', iv.toString('hex'), { mode: 0o600 });
    fs.writeFileSync('.salt.key', salt.toString('hex'), { mode: 0o600 });
}

// Call this function to generate the files
generateEncryptionFiles();

function encryptPassword(password) {
    const algorithm = 'aes-256-cbc';
    let key, iv;

    // Check if the key and IV files exist, if not, generate new ones
    if (fs.existsSync('.encryptionKey.key') && fs.existsSync('.encryptioniv.key')) {
        key = Buffer.from(fs.readFileSync('.encryptionKey.key', 'utf8'), 'hex');
        iv = Buffer.from(fs.readFileSync('.encryptioniv.key', 'utf8'), 'hex');
    } else {
        key = crypto.randomBytes(32); // Generate a secure random key
        iv = crypto.randomBytes(16); // Generate a secure random IV
        fs.writeFileSync('.encryptionKey.key', key.toString('hex'), { mode: 0o600 });
        fs.writeFileSync('.encryptioniv.key', iv.toString('hex'), { mode: 0o600 });
    }

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(password, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
}

function deriveEncryptionKeyFromPassword(encryptedPassword) {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(fs.readFileSync('.encryptionKey.key', 'utf8'), 'hex');
    const iv = Buffer.from(fs.readFileSync('.encryptioniv.key', 'utf8'), 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    let salt;
    if (fs.existsSync('.salt.key')) {
        salt = Buffer.from(fs.readFileSync('.salt.key', 'utf8'), 'hex');
    } else {
       salt = crypto.randomBytes(16);
 fs.writeFileSync('.salt.key', salt.toString('hex'));
    }
    const iterations = 1000000;
    const keyLength = 32;
    const derivedKey = crypto.pbkdf2Sync(decrypted, salt, iterations, keyLength, 'sha256');
    return derivedKey;
}
function storeEncryptedPassword(password) {
    const encryptedPassword = encryptPassword(password);
    fs.writeFileSync('.encryptedPassword.txt', encryptedPassword);
}


module.exports = { encryptPassword, deriveEncryptionKeyFromPassword,storeEncryptedPassword };
