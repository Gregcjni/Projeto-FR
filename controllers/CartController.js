const Carrinhos = require('../models/Carrinhos');
const Produtos = require('../models/Produtos');
const ItensCarrinhos = require('../models/ItensCarrinhos');
const Pedidos = require('../models/Pedidos');

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
        res.status(200).send( { idCarrinho: id } );
    } catch (error) {
        res.send(error);
    }
}

async function finish(req, res, next) {

    let totalValue = 0
    try {
        //Consulta do carrinho fazendo um join de forma automática com seus itens e produtos 
        const cart = await Carrinhos.findOne({
            where: { status: "Ativo" }, include: {
                model: ItensCarrinhos 
            }
        });

        /* validação para, caso não tenha sido incluído nenhum produto, 
        não há carrinho e nesse caso, não gera pedido */
        if (!cart)
            return res.status(400).send({ resultMessage: "Não há produtos no carrinho!" });

        //recuperação dos paramertros enviados no corpo da requisição
        const { formaPagamento, endereco } = req.body;

        //validação do valor total do pedido 
        const itens = cart.ItensCarrinhos;
        
        for (var index = 0; index < itens.length; index++) {
            product = await Produtos.findByPk(itens[index].idProduto);
            totalValue += (product.preco * itens[index].quantidade)
            //totalValue += (itens[index].Produto.preco * itens[index].quantidade);
        }
         
        //retorno com status 400, dado o controle por parte do usuário do valor total
        if (totalValue < 10)
            return res.status(400).send({ resultMessage: "Não é possível gerar um pedido com valor inferior a R$10,00" });
        
        //Criação do pedido
        const order = await Pedidos.create({
            formaPagamento: formaPagamento,
            enderecoEntrega: endereco,
            valorTotal: totalValue,
            status: "Novo"
        });

        //criação dos itens do pedido, a partir dos itens do carrinho
        for (var index = 0; index < itens.length; index++) {
            let product = await Produtos.findByPk(itens[index].idProduto);
            order.addProdutos(product, {
                through: {
                    quantidade: itens[index].quantidade,
                    nome: product.nome,
                    preco: product.preco,
                }
            });
        }

        await Carrinhos.update({ status: "finalizado" }, { where: { id: cart.id } });

        res.status(200).send(order);

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