const Sequelize = require('sequelize');
const dbName = "fr_test_gregory" //criação de um nome que acredito não conflitar com nenhum outro banco

//função que irá gerenciar o acesso ao banco de dados, preparando a conexão quando ela não existir
function connectDataBase() {

    if (!global.connection) { //testa se a conexão está ativa, se não estiver, monta

        global.connection = new Sequelize("", process.env.DBUSER, process.env.DBPASS,
            { host: "localhost", dialect: 'mysql' })

        global.connection.authenticate()
            .then(function () {
                console.log("Connected to Mysql.");
            })
            .catch(error => {
                console.log("Not possible to connect to Database. " + error);
                global.connection = null;
                /*aqui eu faço a limpeza do baco de dados para que caso o banco tenha
                sido desconectado durante o uso da aplicação e venha a ser reconectado, 
                a conexão seja reiniciada na próxima chamada */
            })
    }
}

//função para encerrar conexão com banco de dados qunado necessário
function disconnectDataBase() {
    connection.end();
}

/*função que irá preparar o banco de dados e 
    as tabelas necessárias para a utilização da aplicação
    caso o banco ainda não esteja preparado para tal.*/
function dbInit() {
    connectDataBase()
    global.connection.
        query('CREATE DATABASE IF NOT EXISTS ' + dbName)
        .then(function () {
            console.log("database is created: " + dbName);
            global.connection.query("use " + dbName)
        })
        .then(function () {
            console.log("Using " + dbName);
            tablesInit();
        })
        .catch(error => {
            console.log("Problem while creating database: " + error);
        });
}

function tablesInit() {
    const Products = globalconnection.define('produtos', {
        nome: { type: Sequelize.STRING },
        descricao: { type: Sequelize.TEXT },
        preco: { type: Sequelize.NUMBER },
        image: { type: Sequelize.STRING },
        tags: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING },
        deleted: { type: Sequelize.BOOLEAN }
    });

    const Cart = globalconnection.define('carrinho', {
        nome: { type: Sequelize.STRING },
        descricao: { type: Sequelize.TEXT },
        preco: { type: Sequelize.NUMBER },
        image: { type: Sequelize.STRING },
        tags: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING },
        deleted: { type: Sequelize.BOOLEAN }
    });

    const Order = globalconnection.define('pedidos', {
        nome: { type: Sequelize.STRING },
        descricao: { type: Sequelize.TEXT },
        preco: { type: Sequelize.NUMBER },
        image: { type: Sequelize.STRING },
        tags: { type: Sequelize.STRING },
        status: { type: Sequelize.STRING },
        deleted: { type: Sequelize.BOOLEAN }
    });

}

module.exports = { connectDataBase, disconnectDataBase, dbInit };