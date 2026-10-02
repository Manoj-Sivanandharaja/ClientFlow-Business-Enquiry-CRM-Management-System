const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { successResponse, errorResponse } = require('../utils/apiResponse');

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'clientflow_default_jwt_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ userId }, secret, { expiresIn });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 401, 'Invalid email or password');
    }

    const token = generateToken(user.id);

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };

    return successResponse(res, 200, 'Login successful', {
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const existingUser = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existingUser) {
      return errorResponse(res, 400, 'User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: cleanEmail,
        password: hashedPassword,
        role: role || 'MEMBER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    const token = generateToken(user.id);

    return successResponse(res, 201, 'User registered successfully', {
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res) => {
  return successResponse(res, 200, 'User profile retrieved successfully', {
    user: req.user,
  });
};

module.exports = {
  login,
  register,
  getMe,
};
