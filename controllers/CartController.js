const Carrinhos = require('../models/Carrinhos');
const Produtos = require('../models/Produtos');
const ItensCarrinhos = require('../models/ItensCarrinhos');
const Pedidos = require('../models/Pedidos');
const ItensPedidos = require('../models/ItensPedidos');

async function addProductsToCart(req, res, next) {
    try {
        //busca por carrinho ativo, caso não exista, cria um.
        const [cart] = await Carrinhos.findOrCreate({ where: { status: "Ativo" } })
        const { idProduto, quantidade } = req.body;
        const product = await Produtos.findOne({ where: { id: idProduto, status: "ativo" } });

        if (!product) {
            return res.status(422).send({ resultMessage: "Produto não disponível para compra" });
        } else if (quantidade < 1) {
            return res.status(422).send({ resultMessage: "Quantidade precisa ser maior que zero." });
        }

        await cart.addProdutos(product, { through: { quantidade } });
        const structure = await Carrinhos.findOne({
            where: { status: "Ativo" },
            include: ItensCarrinhos
        });

        const id = structure.id;
        res.status(200).send({ id });
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}

async function finish(req, res, next) {

    let valorTotal = 0
    try {
        const cart = await Carrinhos.findOne({
            where: { status: "Ativo" }, include: {
                model: ItensCarrinhos, include: {
                    model: Produtos
                }
            }
        });

        //caso não tenha sido incluido nenhum produto, não há carrinho e nesse caso, não gera pedido
        if (!cart)
            return res.status(400).send({ resultMessage: "Não há produtos no carrinho!" });

        const { formaPagamento, endereco } = req.body;

        const itens = cart.ItensCarrinhos;
        for (var index = 0; index < itens.length; index++) {
            valorTotal += itens[index].Produto.preco;
            console.log(valorTotal);
        }

        if (valorTotal < 10)
            return res.status(400).send({ resultMessage: "Não é possível gerar um pedido com valor inferior a R$10,00" });

        console.log("gerando pedido");
        //Criação do pedido


        const order = await Pedidos.create({
            formaPagamento: formaPagamento,
            enderecoEntrega: endereco,
            valorTotal: valorTotal,
            status: "Novo"
        });
        console.log(order);

        //criação dos itens do pedido, a partir dos itens do carrinho
        for (var index = 0; index < itens.length; index++) {
            let product = itens[index].Produto;
            order.addProdutos(product, {
                through: {
                    quantidade: itens[index].quantidade
                }
            }
            );
        }

        res.status(200);

    } catch (erro) {
        res.send(erro);
    }

}

async function showCart(req, res, next) {
    const result = await Carrinhos.findOne({
        where: { status: "Ativo" },
        include: ItensCarrinhos
    });
    res.status(200).send(result)
}

module.exports = { addProductsToCart, finish, showCart };