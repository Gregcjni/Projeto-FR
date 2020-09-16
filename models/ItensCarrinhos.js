"use strict";
const { Model, DataTypes } = require('sequelize');
const Carrinhos = require('./Carrinhos');

class ItensCarrinhos extends Model {
    static init(connection) {
        super.init({
            idProduto: DataTypes.INTEGER,
            idCarrinho: DataTypes.INTEGER,
            quantidade: DataTypes.INTEGER
        }, { sequelize: connection })
    };
    static associate(models) {
        this.belongsTo(models.Produtos, {foreignKey: 'id'});
        this.belongsTo(models.Carrinhos, {foreignKey: 'id'});
    }
}


module.exports = ItensCarrinhos;