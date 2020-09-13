const Sequelize = require('sequelize');
const Carrinhos = require('../models/Carrinhos');
const ItensCarrinhos = require('../models/ItensCarrinhos');
const Produtos = require('../models/Produtos');
const ItensPedidos = require('../models/ItensPedidos');
const Pedidos = require('../models/Pedidos');

//criação de um nome que acredito não conflitar com nenhum outro banco
const dbName = "fr_test_gregory"

const connection = new Sequelize(dbName, process.env.DBUSER, process.env.DBPASS,
    { host: "localhost", dialect: 'mysql' });

Produtos.init(connection);
Carrinhos.init(connection);
ItensCarrinhos.init(connection);
Pedidos.init(connection);
ItensPedidos.init(connection);

Produtos.associate(connection.models);
Carrinhos.associate(connection.models);
ItensCarrinhos.associate(connection.models);
Pedidos.associate(connection.models);
ItensPedidos.associate(connection.models);


module.exports = connection;