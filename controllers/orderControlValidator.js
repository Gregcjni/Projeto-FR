"use strict";
const Joi = require('joi');

const listOrderSchema = Joi.object({
    limit:
        Joi.number()
            .integer() 
            .min(1),
    offset:
        Joi.number()
            .integer() 
            .min(1),
});

const changeStatusSchema = Joi.object({

    id:
        Joi.number()
            .integer()
            .required()
            .min(1),
    status:
        Joi.any().valid(
            0, //cancelado  
            2, //aceito
            3, //saiu para entrega
            4, //entregue
        )
});

function validateListOrders(req, res, next) {
    const { error } = listOrderSchema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details });
    next();
};

function validateChangeStatus(req, res, next) {
    const { error } = changeStatusSchema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details });
    next();
};

module.exports = { validateListOrders, validateChangeStatus };