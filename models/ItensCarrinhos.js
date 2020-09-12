const { Model, DataTypes } = require('sequelize');

class ItensCarrinhos extends Model {
    static init(connection) {
        super.init({
            idProduto: DataTypes.INTEGER, 
            idCarrinho: DataTypes.INTEGER, 
            quantidade: DataTypes.INTEGER,
            excluido: DataTypes.BOOLEAN
        }, {sequelize: connection })
    };
}

module.exports = ItensCarrinhos;