"use strict";
const Sequelize = require('sequelize');
const Carrinhos = require('../models/Carrinhos');
const Pedidos = require('../models/Pedidos');
const Produtos = require('../models/Produtos');
const ItensCarrinhos = require('../models/ItensCarrinhos');
const ItensPedidos = require('../models/ItensPedidos');

//createEnvironment()

/*função que irá preparar o banco de dados e 
as tabelas necessárias para a utilização da aplicação .*/
async function createEnvironment() {
    const connection = await new Sequelize("", process.env.DBUSER, process.env.DBPASS,
        { host: "localhost", dialect: 'mysql' });

    console.log("Database connected...")
    await connection.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DBNAME);
    console.log("Database is created: " + process.env.DBNAME);
    await connection.query("use " + process.env.DBNAME);
    console.log("Syncing tables...");
    tablesInit(connection);
    console.log("Tables are created.");
}

async function tablesInit(connection) {

    const Products = connection.define('produtos', {
        nome: { type: Sequelize.STRING },
        descricao: { type: Sequelize.TEXT },
        preco: { type: Sequelize.FLOAT },
        imagem: { type: Sequelize.STRING },
        tags: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING }
    });

    const Cart = connection.define('carrinhos', { 
        status: { type: Sequelize.STRING }
    });

    const CartItems = connection.define('itensCarrinhos', {
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
        quantidade: { type: Sequelize.INTEGER }
    });

    const Order = connection.define('pedidos', {
        formaPagamento: { type: Sequelize.STRING },
        enderecoEntrega: { type: Sequelize.STRING },
        valorTotal: { type: Sequelize.FLOAT },
        status: { type: Sequelize.STRING }
    });

    const OrderItems = connection.define('itensPedidos', {
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

module.exports = { createEnvironment }