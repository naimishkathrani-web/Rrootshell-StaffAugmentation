const sequelize = require('../config/database');
const Contract = require('./Contract');
const Resource = require('./Resource');
const PurchaseOrder = require('./PurchaseOrder');
const User = require('./User');

// Define relationships
Contract.hasMany(Resource, { foreignKey: 'contractId', onDelete: 'CASCADE' });
Resource.belongsTo(Contract, { foreignKey: 'contractId' });

Contract.hasMany(PurchaseOrder, { foreignKey: 'contractId', onDelete: 'CASCADE' });
PurchaseOrder.belongsTo(Contract, { foreignKey: 'contractId' });

Resource.hasMany(PurchaseOrder, { foreignKey: 'resourceId', onDelete: 'CASCADE' });
PurchaseOrder.belongsTo(Resource, { foreignKey: 'resourceId' });

module.exports = {
  sequelize,
  Contract,
  Resource,
  PurchaseOrder,
  User
};
