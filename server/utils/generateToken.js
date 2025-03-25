
const jwt = require('jsonwebtoken');

/**
 * Generate a JWT token for authentication
 * @param {string|object} payload - User ID or custom payload to include in the token
 * @param {string} expiresIn - Token expiration time (default '30d')
 * @param {string} secret - Custom secret key (default: process.env.JWT_SECRET)
 * @returns {string} JWT token
 */
const generateToken = (payload, expiresIn = '30d', secret = null) => {
  // If payload is a string (userId), convert it to an object
  const tokenPayload = typeof payload === 'string' ? { id: payload } : payload;
  
  // Use provided secret or fall back to environment variable
  const tokenSecret = secret || process.env.JWT_SECRET || 'secret_key_change_in_production';
  
  return jwt.sign(tokenPayload, tokenSecret, { expiresIn });
};

module.exports = generateToken;
