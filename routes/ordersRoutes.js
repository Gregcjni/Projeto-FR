"use strict";
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const orderValidator = require('../controllers/orderControlValidator');

router.get('/', orderValidator.validateListOrders, orderController.listOrders);
router.put('/', orderValidator.validateChangeStatus, orderController.changeStatus);

module.exports = router;
