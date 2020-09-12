const Carrinhos = require('../models/Carrinhos');
const mysqlDB = require("../dao/db");
const db = require('../dao/db');

async function createcart(req, res, next) {

    console.log("tratando requisição");
    try {
        await db.connectDataBase();
        Carrinhos.init(global.connection);
        const { nome, descricao, preco, imagem, tags, status } = req.body;
        const cart = await Carrinhos.create({ nome, descricao, preco, imagem, tags, status });
        return res.status(200).json(cart);
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

async function readcarts(req, res, next) {
    try {
        await db.connectDataBase();
        Carrinhos.init(global.connection);
        const carts = await Carrinhos.findAll({where: {status:"Ativo"}});
        return res.status(200).json(carts);
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

async function readAllcarts(req, res, next) {
    try {
        await db.connectDataBase();
        Carrinhos.init(global.connection);
        const carts = await Carrinhos.findAll();
        return res.status(200).json(carts);
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

module.exports = { createcart, readcarts, updatecart, deletecart, readAllcarts };