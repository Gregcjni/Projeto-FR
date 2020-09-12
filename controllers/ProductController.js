const Produtos = require('../models/Produtos');
const mysqlDB = require("../dao/db");
const db = require('../dao/db');

async function createProduct(req, res, next) {

    console.log("tratando requisição");
    try {
        await db.connectDataBase();
        Produtos.init(global.connection);
        const { nome, descricao, preco, imagem, tags, status } = req.body;
        const product = await Produtos.create({ nome, descricao, preco, imagem, tags, status });
        return res.status(200).json(product);
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

async function readProducts(req, res, next) {
    try {
        await db.connectDataBase();
        Produtos.init(global.connection);
        const products = await Produtos.findAll({where: {status:"Ativo"}});
        return res.status(200).json(products);
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

async function updateProduct(req, res, next) {
    try {
        await db.connectDataBase();
        Produtos.init(global.connection);
        const { id, nome, descricao, preco, imagem, tags, status } = req.body;
        console.log("updating product of id: " + id);
        await Produtos.update({ nome, descricao, preco, imagem, tags, status }, { where: { id: id } });
        return res.status(200);
    } catch (error) {
        let message = "Não foi possível alterar, verifique os parâmetros";
        res.send({ message, error });
    }
}

async function deleteProduct(req, res, next) {
    try {
        await db.connectDataBase();
        Produtos.init(global.connection);
        const { id } = req.body;
        const products = await Produtos.destroy({ where: { id:id } });
        return res.status(200);
    } catch (error) {
        let message = "Não foi possível excluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

async function readAllProducts(req, res, next) {
    try {
        await db.connectDataBase();
        Produtos.init(global.connection);
        const products = await Produtos.findAll();
        return res.status(200).json(products);
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

module.exports = { createProduct, readProducts, updateProduct, deleteProduct, readAllProducts };