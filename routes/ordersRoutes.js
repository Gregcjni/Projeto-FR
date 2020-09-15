const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.get('/', OrderController.listOrders);
router.post('/', OrderController.changeStatus);

module.exports = router;
