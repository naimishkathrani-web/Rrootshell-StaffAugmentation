const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, purchaseOrderController.getAllPurchaseOrders);
router.get('/expiring', authenticate, purchaseOrderController.getExpiringPurchaseOrders);
router.get('/contract/:contractId', authenticate, purchaseOrderController.getPurchaseOrdersByContract);
router.get('/:id', authenticate, purchaseOrderController.getPurchaseOrder);
router.post('/', authenticate, purchaseOrderController.createPurchaseOrder);
router.put('/:id', authenticate, purchaseOrderController.updatePurchaseOrder);
router.delete('/:id', authenticate, purchaseOrderController.deletePurchaseOrder);

module.exports = router;
