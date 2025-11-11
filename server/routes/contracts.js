const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contractController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, contractController.getAllContracts);
router.get('/expiring', authenticate, contractController.getExpiringContracts);
router.get('/:id', authenticate, contractController.getContract);
router.post('/', authenticate, contractController.createContract);
router.put('/:id', authenticate, contractController.updateContract);
router.delete('/:id', authenticate, contractController.deleteContract);

module.exports = router;
