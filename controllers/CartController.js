const Carrinhos = require('../models/Carrinhos');
const db = require('../dao/db');
const { findOrCreate } = require('../models/Carrinhos');
const ItensCarrinhos = require('../models/ItensCarrinhos');
const Produtos = require('../models/Produtos');
const ItensPedidos = require('../models/ItensPedidos');
const Pedidos = require('../models/Pedidos');

db.dbInit();
Produtos.init(global.connection);
Carrinhos.init(global.connection);
ItensCarrinhos.init(global.connection);
Pedidos.init(global.connection);
ItensPedidos.init(global.connection);

Carrinhos.associate(global.connection.models);
ItensCarrinhos.associate(global.connection.models);

async function adddProducts(req, res, next) {

    try {
        console.log("Consultando carrinho");
        
        
        if (cart) {
            //console.log("Carrinho:" + cart);
            //const itemCart = await ItensCarrinhos.create({ idProduto, quantidade, idCarrinho: cart.id });
            //return res.status(200).json(cart);
        } else {
            return res.status(400).send("Nenhum carrinho Ativo");
        }
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