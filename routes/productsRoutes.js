"use strict";
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const productValidator = require('../controllers/productControlValidator');

router.get('/', 
    productValidator.validateProductList, 
    productController.readProducts);

router.get('/all/', 
    productValidator.validateProductList, 
    productController.readAllProducts);

router.post('/', 
    productValidator.validateProductCreation,
    productController.createProduct);

router.put('/', 
    productValidator.validateProductUpdate,
    productController.updateProduct);

router.delete('/', 
    productValidator.validateProductDelete,
    productController.deleteProduct);

module.exports = router;
