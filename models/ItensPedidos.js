const { Model, DataTypes } = require('sequelize');

class ItensPedidos extends Model {
    static init(connection) {
        super.init({
            idProduto: DataTypes.INTEGER,
            idPedido: DataTypes.INTEGER,
            nome: DataTypes.STRING,
            preco: DataTypes.FLOAT,
            quantidade: DataTypes.INTEGER
        }, { sequelize: connection })
    };
    static associate(models) {
        this.belongsTo(models.Produtos);
        this.belongsTo(models.Carrinhos);
    }
}

module.exports = ItensPedidos;