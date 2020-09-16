"use strict";
const Joi = require('joi');

const productCreationSchema = Joi.object({
    nome:
        Joi.string()
            .required(),
    descricao:
        Joi.string(),
    preco:
        Joi.number()
            .required()
            .min(0.05),
    imagem:
        Joi.string(),
    tags:
        Joi.string(),
    status:
        Joi.any()
            .valid(
                "Ativo",
                "Inativo"
            ).required()

});

const productUpdateSchema = Joi.object({
    id:
        Joi.number()
            .integer()
            .required()
            .min(1),
    nome:
        Joi.string(),
    descricao:
        Joi.string(),
    preco:
        Joi.number()
            .min(0.05),
    imagem:
        Joi.string(),
    tags:
        Joi.string(),
    status:
        Joi.any()
            .valid(
                "Ativo",
                "Inativo"
            )
});




const productDeleteSchema = Joi.object({
    id:
        Joi.number()
            .integer()
            .required()
            .min(1)
});

const productGetSchema = Joi.object({
    limit:
        Joi.number()
            .integer()
            .min(1),
    offset:
        Joi.number()
            .integer()
            .min(1),
    nome:
        Joi.string(),
        
    tags:
        Joi.string()       
});

function validateProductCreation(req, res, next) {
    const { error } = productCreationSchema.validate(req.body);
    if (error)
        return res.status(400).json({ error: error.details });

    next();
};

function validateProductUpdate(req, res, next) {
    const { error } = productUpdateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    next();
};

function validateProductDelete(req, res, next) {
    const { error } = productDeleteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    next();
};

function validateProductList(req, res, next) {
    const { error } = productGetSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    next();
};


module.exports = { validateProductCreation, validateProductUpdate, validateProductDelete, validateProductList };