const { Model, DataTypes } = require('sequelize');

class ItensPedidos extends Model {
    static init(connection) {
        super.init({
            idProduto: DataTypes.INTEGER,
            idPedido: DataTypes.INTEGER,
            nome: DataTypes.STRING,
            preco: DataTypes.FLOAT,
            quantidade: DataTypes.INTEGER,
            excluido: DataTypes.BOOLEAN
        }, { sequelize: connection })
    };
    static associate(models) {
        this.belongsTo(models.Pedidos, { foreignKey: "id", as: "pedidoCabecalho" });
        this.belongsToMany(models.Produtos, { foreignKey: "id", as: "produto" });
    }
}

module.exports = ItensPedidos;