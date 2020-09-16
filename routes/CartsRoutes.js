"use strict";
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const cartValidator = require('../controllers/cartControlValidator');

router.post('/', cartValidator.validateAddToCart ,cartController.addProductsToCart);
router.post('/finish/', cartController.finish);
router.get('/', cartController.showCart);

module.exports = router;
