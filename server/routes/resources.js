const express = require('express');
const router = express.Router();
const resourceController = require('../controllers/resourceController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, resourceController.getAllResources);
router.get('/contract/:contractId', authenticate, resourceController.getResourcesByContract);
router.get('/:id', authenticate, resourceController.getResource);
router.post('/', authenticate, resourceController.createResource);
router.put('/:id', authenticate, resourceController.updateResource);
router.delete('/:id', authenticate, resourceController.deleteResource);

module.exports = router;
