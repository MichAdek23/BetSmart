
const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for authentication
 * @param {string} id - User ID to include in the token
 * @param {string} expiresIn - Token expiration time (default '30d')
 * @returns {string} JWT token
 */
const generateToken = (id, expiresIn = '30d') => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key_change_in_production', {
    expiresIn
  });
};

module.exports = generateToken;
