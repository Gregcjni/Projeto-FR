const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/', CartController.addProductsToCart);
router.post('/finish/', CartController.finish);
router.get('/', CartController.showCart);

module.exports = router;
