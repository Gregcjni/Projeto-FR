const Carrinhos = require('../models/Carrinhos');
const Produtos = require('../models/Produtos');
const ItensCarrinhos = require('../models/ItensCarrinhos');

async function addProductsToCart(req, res, next) {
    try {
        const [cart] = await Carrinhos.findOrCreate({ where: { status: "Ativo" } })
        const { idProduto, quantidade } = req.body;
        const product = await Produtos.findOne( {where: { id: idProduto, status: "ativo" }});
        
        if (!product) {
            return res.status(422).send({resultMessage:"Produto não disponível para compra"});
        } else if (quantidade < 1) {
            return res.status(422).send({resultMessage:"Quantidade precisa ser maior que zero."});
        }
        
        await cart.addProdutos(product, { through: { quantidade } });
        const structure = await Carrinhos.findOne({
            where: { status: "Ativo" }, 
            include: ItensCarrinhos
        });
        const id = structure.id;
        res.status(200).send({id});
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

async function finish(req, res, next) {
    
    
    
}

async function showCart(req, res, next) {
    const result = await Carrinhos.findOne({
        where: { status: "Ativo" },
        include: ItensCarrinhos
    });
    res.status(200).send(result)
}

module.exports = { addProductsToCart, finish, showCart };