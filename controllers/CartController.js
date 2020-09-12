const Carrinhos = require('../models/Carrinhos');
const db = require('../dao/db');
const { findOrCreate } = require('../models/Carrinhos');
const ItensCarrinhos = require('../models/ItensCarrinhos');

async function adddProducts(req, res, next) {

    try {
        await db.connectDataBase();
        Carrinhos.init(global.connection);
        Carrinhos.associate(global.connection.models);
        const { idProduto, quantidade } = req.body;
        const cart = await Carrinhos.findOrCreate({ where: { status: "Ativo" } });
        const itemCart = await ItensCarrinhos.create({ idProduto, quantidade, idCarrinho: cart.id });
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
        if (carts) {

        }
        return res.status(200).json(cart);
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

module.exports = { adddProducts, finish };