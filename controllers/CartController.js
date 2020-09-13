const { findOrCreate } = require('../models/Carrinhos');

async function adddProducts(req, res, next) {
    try {
        const cart = Carrinhos.findAll({ where: { status: "Ativo" } })
        if (!cart) {
            cart = Carrinhos.create()
        }
        const { idProduto, quantidade } = req.body;
        const cartItem = ItensCarrinhos.create({ idProduto, quantidade });
        res.status(200).send(cart)
    } catch (error) {
        let message = "Não foi possível incluir, verifique os parâmetros";
        res.send({ message, error });
    }
}

async function finish(req, res, next) {
    res.status(200);
}

async function show(req, res, next) {
    res.status(200);
}

module.exports = { adddProducts, finish, show };