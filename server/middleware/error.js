
const logger = require('../utils/logger');

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error
  logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  
  // Set status code and prepare response
  const statusCode = err.statusCode || 500;
  const errorResponse = {
    success: false,
    message: err.message || 'Server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  };
  
  // Send error response
  res.status(statusCode).json(errorResponse);
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Async handler to avoid try-catch blocks
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = {
  errorHandler,
  AppError,
  asyncHandler
};
