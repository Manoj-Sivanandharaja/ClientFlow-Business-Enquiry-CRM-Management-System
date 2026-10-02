const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.get('/', authenticate, getUsers);

module.exports = router;
