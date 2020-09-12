const Carrinhos = require('../models/Carrinhos');
const db = require('../dao/db');

async function adddProducts(req, res, next) {

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

async function finish(req, res, next) {

    try {
        await db.connectDataBase();
        Carrinhos.init(global.connection);
        const { productID, quantity } = req.body;
        const carts = await Carrinhos.findAll();
        if (carts){
            
        }
        return res.status(200).json(cart);
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

module.exports = { adddProducts, finish };