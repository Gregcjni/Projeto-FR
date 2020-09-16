"use strict";
const { Model, DataTypes } = require('sequelize');
const ItensCarrinhos = require('./ItensCarrinhos');

class Carrinhos extends Model {
    static init(connection) {
        super.init({
            idCliente: DataTypes.INTEGER,
            status: DataTypes.STRING,
        }, { sequelize: connection })
    }

    static associate(models) {
        this.belongsToMany(models.Produtos, { through: "ItensCarrinhos", foreignKey: "idCarrinho" });
        this.hasMany(models.ItensCarrinhos, { foreignKey: "idCarrinho" });
    }
};

module.exports = Carrinhos;