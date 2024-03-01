// validator.js

function isValidVariableName(name) {
  // Implement your validation logic for variable names
  // For example, check if the name follows certain rules
  // You might want to check for alphanumeric characters, underscores, etc.
  const isValid = /^[a-zA-Z0-9_]+$/.test(name);
  return isValid;
}

function isValidVariableValue(value) {
  // Implement your validation logic for variable values
  // You might want to check for certain conditions based on your requirements
  // For example, check if the value is not empty or meets specific criteria
  const isValid = typeof value === 'string' && value.trim() !== '';
  return isValid;
}

module.exports = { isValidVariableName, isValidVariableValue };
