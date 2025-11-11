const { Resource, Contract } = require('../models');

// Get all resources
exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll({
      include: [{ model: Contract }],
      order: [['createdAt', 'DESC']]
    });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single resource
exports.getResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id, {
      include: [{ model: Contract }]
    });
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create resource
exports.createResource = async (req, res) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update resource
exports.updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    await resource.update(req.body);
    res.json(resource);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete resource
exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByPk(req.params.id);
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    await resource.destroy();
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get resources by contract
exports.getResourcesByContract = async (req, res) => {
  try {
    const resources = await Resource.findAll({
      where: { contractId: req.params.contractId },
      include: [{ model: Contract }]
    });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
