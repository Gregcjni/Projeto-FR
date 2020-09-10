import { createConnection } from 'mysql';

//função que irá gerenciar o acesso ao banco de dados, preparando a conexão quando ela não existir
function connectDataBase() {

    if (!global.connection) {
        global.connection = createConnection({
            host: process.env.DBHOST, //'localhost',
            user: process.env.DBUSER,
            password: process.env.DBPASS,
        });

        connection.connect().then(sucess => {
            console.log("Connected to Database.");
            console.log("Verifying tables");
            checkTables();
        }).catch(error => {
            console.log("Not possible to connect to Database. " + error);
        });
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
    let dbName = "fr_test_gregory" //criação de um nome que acredito não conflitar com nenhum outro banco
    global.connection.query('CREATE DATABASE IF NOT EXISTS ' + dbName)
        .then(sucess => {
            console.log("database was created");
            tablesInit();
        })
        .catch(error => {
            console.log("Problem while creating database: " + error);
        });
}

function tablesInit() {
    let tableProducts = "products"
    let columsProducts = [
        {name:"nome", size:40, type:"string"},
        {name:"description", size:100, type:"string"},
        {name:"price", size:10, type:"number"},
        {name:"image", size:150, type:"string"},
        {name:"tags", size:50, type:"string"},
        {name:"status", size:40, type:"string"},
        {name:"deleted", size:1, type:"boolean"}
        ]
    tableCart   = "cart"
    
}

function tableCreate(tableName, tableColums){
    global.connection.query('CREATE TABLE IF NOT EXISTS ' + tablename)
        .then( sucess => {
            console.log("database was created");
        })
        .catch( error => {
            console.log("Problem while creating database: "+ error);
        });
    global.connection.query ("create table i")
}

module.exports = { connectDataBase, disconnectDataBase, dbInit };