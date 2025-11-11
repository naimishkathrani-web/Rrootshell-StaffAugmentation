const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contract = sequelize.define('Contract', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contractNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'renewed', 'terminated'),
    defaultValue: 'active'
  },
  description: {
    type: DataTypes.TEXT
  },
  notificationSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = Contract;
