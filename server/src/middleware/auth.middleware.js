const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { errorResponse } = require('../utils/apiResponse');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 401, 'Authentication token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'clientflow_default_jwt_secret';

    const decoded = jwt.verify(token, secret);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return errorResponse(res, 401, 'User associated with this token no longer exists');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return errorResponse(res, 401, 'Invalid or expired authentication token');
    }
    return errorResponse(res, 500, 'Authentication error', error.message);
  }
};

module.exports = { authenticate };
