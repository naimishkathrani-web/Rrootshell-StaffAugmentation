const { Contract, Resource, PurchaseOrder } = require('../models');
const { Op } = require('sequelize');

// Get all contracts
exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        { model: Resource },
        { model: PurchaseOrder }
      ],
      order: [['endDate', 'ASC']]
    });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single contract
exports.getContract = async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id, {
      include: [
        { model: Resource },
        { model: PurchaseOrder }
      ]
    });
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    res.json(contract);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create contract
exports.createContract = async (req, res) => {
  try {
    const contract = await Contract.create(req.body);
    res.status(201).json(contract);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update contract
exports.updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    await contract.update(req.body);
    res.json(contract);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete contract
exports.deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) {
      return res.status(404).json({ error: 'Contract not found' });
    }
    await contract.destroy();
    res.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get expiring contracts
exports.getExpiringContracts = async (req, res) => {
  try {
    const daysAhead = parseInt(req.query.days) || 30;
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + daysAhead);

    const contracts = await Contract.findAll({
      where: {
        endDate: {
          [Op.between]: [today, futureDate]
        },
        status: 'active'
      },
      include: [
        { model: Resource },
        { model: PurchaseOrder }
      ],
      order: [['endDate', 'ASC']]
    });
    res.json(contracts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
