const Sequelize = require('sequelize');
const dbName = "fr_test_gregory" //criação de um nome que acredito não conflitar com nenhum outro banco

function connectDataBase() {
    if (!global.connection) { //testa se a conexão está ativa, se não estiver, monta
        global.connection = new Sequelize("", process.env.DBUSER, process.env.DBPASS,
            { host: "localhost", dialect: 'mysql' });
        return global.connection.authenticate();
    }
}


/*função que irá preparar o banco de dados e 
    as tabelas necessárias para a utilização da aplicação .*/
async function dbInit() {
    try {
        await connectDataBase()
        console.log("Database connected...")
        await global.connection.query('CREATE DATABASE IF NOT EXISTS ' + dbName);
        console.log("Database is created: " + dbName);
        await global.connection.query("use " + dbName);
        console.log("Syncing tables...");
        await tablesInit();
        console.log("Tables are created.");
    } catch (error) {
        console.log("Problem while preparing database: " + error);
    }
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
        idCliente: { type: Sequelize.STRING },
        dataCriacao: { type: Sequelize.DATE },
        horaCriacao: { type: Sequelize.TIME },
        excluido: { type: Sequelize.BOOLEAN }
    });

    const CartItems = global.connection.define('itensCarrinho', {
        idProduto: { type: Sequelize.STRING },
        idCarrinho: { type: Sequelize.STRING },
        quantidade: { type: Sequelize.INTEGER },
        excluido: { type: Sequelize.BOOLEAN }
    });

    const Order = global.connection.define('pedidos', {
        formaPagamento: { type: Sequelize.STRING },
        enderecoEntrega: { type: Sequelize.STRING },
        dataCriacao: { type: Sequelize.DATE },
        valorTotal: { type: Sequelize.FLOAT },
        status: { type: Sequelize.STRING },
        idCarrinho: { type: Sequelize.STRING },
        excluido: { type: Sequelize.BOOLEAN }
    });

    const OrderItems = global.connection.define('itensPedido', {
        idProduto: { type: Sequelize.TEXT },
        nome: { type: Sequelize.STRING },
        preco: { type: Sequelize.FLOAT },
        quantidade: { type: Sequelize.INTEGER }
    });

    await Products.sync({ force: true });
    await Cart.sync({ force: true });
    await CartItems.sync({ force: true });
    await Order.sync({ force: true });
    await OrderItems.sync({ force: true });

}

module.exports = { connectDataBase, dbInit };