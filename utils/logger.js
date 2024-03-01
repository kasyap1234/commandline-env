// logger.js

function log(message) {
  console.log(message);
}

function error(message) {
  console.error(`Error: ${message}`);
}

module.exports = { log, error };
