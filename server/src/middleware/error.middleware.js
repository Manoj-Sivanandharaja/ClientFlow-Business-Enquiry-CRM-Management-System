const { errorResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error('🔥 Server Error Stack:', err.stack || err);

  // Prisma unique constraint error
  if (err.code === 'P2002') {
    const targetField = err.meta?.target?.[0] || 'field';
    return errorResponse(res, 400, `A record with this ${targetField} already exists.`);
  }

  // Prisma record not found error
  if (err.code === 'P2025') {
    return errorResponse(res, 404, 'Requested record was not found.');
  }

  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'Internal Server Error';

  return errorResponse(res, statusCode, message);
};

const notFoundHandler = (req, res) => {
  return errorResponse(res, 404, `Route not found - ${req.originalUrl}`);
};

module.exports = { errorHandler, notFoundHandler };
