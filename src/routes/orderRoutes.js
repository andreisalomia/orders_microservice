const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/:order_id', orderController.getOrder);
router.get('/', orderController.getOrders);
router.delete('/:order_id', orderController.deleteOrder);

module.exports = router;