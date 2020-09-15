const Sequelize = require('sequelize');
const Carrinhos = require('../models/Carrinhos');
const ItensCarrinhos = require('../models/ItensCarrinhos');
const Produtos = require('../models/Produtos');
const ItensPedidos = require('../models/ItensPedidos');
const Pedidos = require('../models/Pedidos');
const build = require('./buildSchema')

//criação de um nome que acredito não conflitar com nenhum outro banco


const connection = connect()

async function connect() {
    let con;
    try {
        con = await new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS,
            { host: "localhost", dialect: 'mysql' });
        await con.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        build.createEnvironment();
        con = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS,
            { host: "localhost", dialect: 'mysql' });
    }

    //inicialização das entidades modelo
    Produtos.init(con);
    Carrinhos.init(con);
    ItensCarrinhos.init(con);
    Pedidos.init(con);
    ItensPedidos.init(con);

    //associações entre entidades modelo
    Produtos.associate(con.models);
    Carrinhos.associate(con.models);
    ItensCarrinhos.associate(con.models);
    Pedidos.associate(con.models);
    ItensPedidos.associate(con.models);

    return con;

}

module.exports = connection;