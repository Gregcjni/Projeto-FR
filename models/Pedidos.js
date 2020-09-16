"use strict";
const { Model, DataTypes } = require('sequelize');

class Pedidos extends Model {
    static init(connection) {
        super.init({
            formaPagamento: DataTypes.STRING,
            enderecoEntrega: DataTypes.TEXT,
            valorTotal: DataTypes.FLOAT,
            status: DataTypes.STRING
        }, { sequelize: connection })
    };
    static associate(models) {
        this.belongsToMany(models.Produtos, { through: "ItensPedidos", foreignKey: "idPedido" });
        this.hasMany(models.ItensPedidos, { foreignKey: "idPedido" });
    }
}

module.exports = Pedidos;