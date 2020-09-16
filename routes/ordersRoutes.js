const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.get('/', OrderController.listOrders);
router.put('/', OrderController.changeStatus);

module.exports = router;
