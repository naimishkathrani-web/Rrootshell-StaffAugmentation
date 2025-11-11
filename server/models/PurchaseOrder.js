const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PurchaseOrder = sequelize.define('PurchaseOrder', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  poNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  resourceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Resources',
      key: 'id'
    }
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
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'expired', 'renewed'),
    defaultValue: 'active'
  },
  notificationSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

module.exports = PurchaseOrder;
