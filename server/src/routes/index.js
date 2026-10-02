const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const enquiryRoutes = require('./enquiry.routes');
const dashboardRoutes = require('./dashboard.routes');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
