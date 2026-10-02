const prisma = require('../config/db');
const { successResponse } = require('../utils/apiResponse');

const getUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
      orderBy: { name: 'asc' },
    });

    return successResponse(res, 200, 'Users retrieved successfully', users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};
