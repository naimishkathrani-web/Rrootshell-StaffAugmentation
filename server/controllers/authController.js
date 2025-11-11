const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Register user
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    const existingUser = await User.findOne({ 
      where: { 
        [require('sequelize').Op.or]: [{ username }, { email }] 
      } 
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const user = await User.create({ username, email, password, role });
    
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await user.validatePassword(password);
    
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
