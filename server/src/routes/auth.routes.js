const express = require('express');
const router = express.Router();
const { login, register, getMe } = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { authenticate } = require('../middleware/auth.middleware');
const { loginSchema, registerSchema } = require('../validators/auth.validator');

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);
router.get('/me', authenticate, getMe);

module.exports = router;
