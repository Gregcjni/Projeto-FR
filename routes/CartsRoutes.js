const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/add/', CartController.adddProducts);
router.post('/finish/', CartController.finish);
router.get('/', CartController.show);

module.exports = router;
