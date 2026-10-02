require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler, notFoundHandler } = require('./middleware/error.middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Welcome / API Overview
app.get('/', (req, res) => {
  res.json({
    name: 'ClientFlow API Server',
    status: 'Running',
    version: '1.0.0',
    documentation: {
      health: '/health',
      apiBaseUrl: '/api',
      endpoints: [
        '/api/auth/login',
        '/api/auth/register',
        '/api/enquiries',
        '/api/dashboard/stats',
        '/api/users'
      ]
    }
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'ClientFlow API server is running', timestamp: new Date() });
});

// API Routes
app.use('/api', routes);

// 404 & Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

module.exports = app;
