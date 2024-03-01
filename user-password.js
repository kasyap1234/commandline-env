const bcrypt = require('bcrypt');

// Function to generate a hashed version of the user's password
async function generateHashedPassword(password) {
  try {
    // Generate a salt
    const saltRounds = 10; // Number of salt rounds
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    console.error('Error generating hashed password:', error);
    throw error;
  }
}

// Function to verify a user's password against a stored hash
async function verifyPassword(password, storedHash) {
  try {
    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, storedHash);
    return isPasswordValid;
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
}

// Usage example
module.exports={
  generateHashedPassword,
  verifyPassword
}


