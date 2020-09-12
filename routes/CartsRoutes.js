const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.post('/add/', CartController.adddProducts);
router.get('/finish/', CartController.finish);

module.exports = router;
