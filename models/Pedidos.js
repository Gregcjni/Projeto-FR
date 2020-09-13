const { Model, DataTypes } = require('sequelize');

class Pedidos extends Model {
    static init(connection) {
        super.init({
            formaPagamento: DataTypes.STRING,
            enderecoEntrega: DataTypes.TEXT,
            valorTotal: DataTypes.FLOAT,
            status: DataTypes.STRING,
            status: DataTypes.STRING,
            excluido: DataTypes.BOOLEAN
        }, { sequelize: connection })
    };
    static associate(models) {
        this.belongsToMany(models.Produtos, { through: "ItensPedidos", foreignKey: "idPediso" });
        this.hasMany(models.ItensPedidos);
        this.belongsTo(models.Carrinhos);
    }
}

module.exports = Pedidos;