"use strict";
const Joi = require('joi');

const addToCartSchema = Joi.object({
    idProduto:
        Joi.number()
            .integer()
            .required()
            .min(1),
    quantidade:
        Joi.number()
            .integer()
            .required()
            .min(1),
});

const finishCartSchema = Joi.object({
    formaPagamento:
        Joi.any()
            .valid(
                "Dinheiro",
                "Cartão"
            ).required(),
    endereco:
        Joi.string()
            .required()
});

function validateFinishCart(req, res, next) {
    const { error } = finishCartSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    next();
};

function validateAddToCart(req, res, next) {
    const { error } = addToCartSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    next();
};

function validateAddToCart(req, res, next) {
    const { error } = addToCartSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    next();
};

module.exports = { validateAddToCart, validateFinishCart };