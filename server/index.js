require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { sequelize } = require('./models');
const { runNotificationChecks } = require('./utils/notifications');

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: 'Too many login attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const staticLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Higher limit for static files
  message: 'Too many requests for static files, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all routes
app.use('/api/', limiter);

// Routes with specific rate limiting
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contracts', require('./routes/contracts'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/purchase-orders', require('./routes/purchaseOrders'));

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(staticLimiter);
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Schedule notification checks (daily at 9 AM)
cron.schedule('0 9 * * *', () => {
  console.log('Running scheduled notification checks...');
  runNotificationChecks();
});

// Also check on server startup
setTimeout(() => {
  runNotificationChecks();
}, 5000);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Initialize database and start server
async function startServer() {
  try {
    await sequelize.sync();
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
}

startServer();
