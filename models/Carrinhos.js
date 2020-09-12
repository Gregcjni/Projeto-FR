const { Model, DataTypes } = require('sequelize');

class Carrinhos extends Model {
    static init(connection) {
        super.init({
            idCliente: DataTypes.INTEGER, 
            status: DataTypes.BOOLEAN,
            excluido: DataTypes.BOOLEAN
        }, {sequelize: connection })
    };
}

module.exports = Carrinhos;