const Carrinhos = require('../models/Carrinhos');
const Pedidos = require('../models/Pedidos');
const Produtos = require('../models/Produtos');
const ItensCarrinhos = require('../models/ItensCarrinhos');
const ItensPedidos = require('../models/ItensPedidos');

/*função que irá preparar o banco de dados e 
as tabelas necessárias para a utilização da aplicação .*/
async function createEnvironment(){
    const connection = new Sequelize("", process.env.DBUSER, process.env.DBPASS,
    { host: "localhost", dialect: 'mysql' });

    console.log("Database connected...")
    connection.query('CREATE DATABASE IF NOT EXISTS ' + dbName);
    console.log("Database is created: " + dbName);
    connection.query("use " + dbName);
    console.log("Syncing tables...");
    tablesInit();
    console.log("Tables are created.");
}

async function tablesInit() {

    const Products = global.connection.define('produtos', {
        nome: { type: Sequelize.STRING },
        descricao: { type: Sequelize.TEXT },
        preco: { type: Sequelize.FLOAT },
        imagem: { type: Sequelize.STRING },
        tags: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING },
        excluido: { type: Sequelize.BOOLEAN }
    });

    const Cart = global.connection.define('carrinhos', {
        idCliente: { type: Sequelize.INTEGER },
        status: { type: Sequelize.STRING },
        excluido: { type: Sequelize.BOOLEAN }
    });

    const CartItems = global.connection.define('itensCarrinhos', {
        idProduto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "produtos", key: "id" },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        idCarrinho: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "carrinhos", key: "id" },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        quantidade: { type: Sequelize.INTEGER },
        excluido: { type: Sequelize.BOOLEAN }
    });

    const Order = global.connection.define('pedidos', {
        formaPagamento: { type: Sequelize.STRING },
        enderecoEntrega: { type: Sequelize.STRING },
        valorTotal: { type: Sequelize.FLOAT },
        status: { type: Sequelize.STRING },
        idCarrinho: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "carrinhos", key: "id" },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        excluido: { type: Sequelize.BOOLEAN }
    });

    const OrderItems = global.connection.define('itensPedidos', {
        idProduto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "produtos", key: "id" },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        idPedido: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: "pedidos", key: "id" },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        nome: { type: Sequelize.STRING },
        preco: { type: Sequelize.FLOAT },
        quantidade: { type: Sequelize.INTEGER }
    });

    await Products.sync();
    await Cart.sync();
    await CartItems.sync();
    await Order.sync();
    await OrderItems.sync();

}