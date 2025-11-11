const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Resource = sequelize.define('Resource', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contractId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Contracts',
      key: 'id'
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  skills: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'completed'),
    defaultValue: 'active'
  }
}, {
  timestamps: true
});

module.exports = Resource;
