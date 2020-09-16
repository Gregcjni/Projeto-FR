"use strict";
const db = require('../dao/db');
const Produtos = require('../models/Produtos');

async function createProduct(req, res, next) {
    try {
        const { nome, descricao, preco, imagem, tags, status } = req.body;
        const product = await Produtos.create({ nome, descricao, preco, imagem, tags, status });
        return res.status(200).json(product);
    } catch (error) {
        res.send(error);
    }
}

async function readProducts(req, res, next) {
    try {
        const {limit, offset} = req.body;
        const products = await Produtos.findAll({
            where: { status: "Ativo" },
            limit,
            offset
        });
        return res.status(200).json(products);
    } catch (error) {
        res.send(error);
    }
}

async function updateProduct(req, res, next) {
    try {
        const { id, nome, descricao, preco, imagem, tags, status } = req.body;
        console.log("updating product of id: " + id);
        await Produtos.update({ nome, descricao, preco, imagem, tags, status }, { where: { id: id } });
        product = await Produtos.findByPk(id);
        return res.status(200).send(product);
    } catch (error) {
        res.send(error);
    }

}

async function deleteProduct(req, res, next) {
    try {
        const { id } = req.body;
        const product = await Produtos.findByPk(id);
        if (!product)
            return res.status(400).send({message:"Produto não encontrado"});
        /*implementação do soft delete, mudando apenas o status do produto 
        para queo mesmo não possa ser utilizado nas demais funcionalidades
         (listar, adicionar ao carrinho, etc)
        */
       await Produtos.update({ status:"excluido" }, { where: { id: id } });
        return res.status(200).json({ message: "Excluído" });
    } catch (error) {
        res.send(error);
    }
}

async function readAllProducts(req, res, next) {
    try {
        const {limit, offset} = req.body;
        const products = await Produtos.findAll({
            limit,
            offset
            });
        console.log(products);
        return res.status(200).json(products);
    } catch (error) {
        res.send(error);
    }
}

module.exports = { createProduct, readProducts, updateProduct, deleteProduct, readAllProducts };