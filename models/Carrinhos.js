const { Model, DataTypes } = require('sequelize');

class Carrinhos extends Model {
    static init(connection) {
        super.init({
            idCliente: DataTypes.STRING, 
            dataCriacao: DataTypes.DATE, 
            horaCriacao: DataTypes.TIME, 
            excluido: DataTypes.BOOLEAN
        }, {sequelize: connection })
    };
}

module.exports = Carrinhos;