const { PurchaseOrder, Resource, Contract } = require('../models');
const { Op } = require('sequelize');

// Get all purchase orders
exports.getAllPurchaseOrders = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.findAll({
      include: [
        { model: Resource },
        { model: Contract }
      ],
      order: [['endDate', 'ASC']]
    });
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single purchase order
exports.getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByPk(req.params.id, {
      include: [
        { model: Resource },
        { model: Contract }
      ]
    });
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase Order not found' });
    }
    res.json(purchaseOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create purchase order
exports.createPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.create(req.body);
    res.status(201).json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update purchase order
exports.updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase Order not found' });
    }
    await purchaseOrder.update(req.body);
    res.json(purchaseOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete purchase order
exports.deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
    if (!purchaseOrder) {
      return res.status(404).json({ error: 'Purchase Order not found' });
    }
    await purchaseOrder.destroy();
    res.json({ message: 'Purchase Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get expiring purchase orders
exports.getExpiringPurchaseOrders = async (req, res) => {
  try {
    const daysAhead = parseInt(req.query.days) || 30;
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + daysAhead);

    const purchaseOrders = await PurchaseOrder.findAll({
      where: {
        endDate: {
          [Op.between]: [today, futureDate]
        },
        status: 'active'
      },
      include: [
        { model: Resource },
        { model: Contract }
      ],
      order: [['endDate', 'ASC']]
    });
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get purchase orders by contract
exports.getPurchaseOrdersByContract = async (req, res) => {
  try {
    const purchaseOrders = await PurchaseOrder.findAll({
      where: { contractId: req.params.contractId },
      include: [
        { model: Resource },
        { model: Contract }
      ]
    });
    res.json(purchaseOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
