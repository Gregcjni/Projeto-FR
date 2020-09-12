const { Model, DataTypes } = require('sequelize');

class Produto extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.TEXT,
            preco: DataTypes.FLOAT,
            imagem: DataTypes.STRING,
            tags: DataTypes.STRING,
            status: DataTypes.STRING,
            excluido: DataTypes.BOOLEAN
        }, {sequelize: connection })
    };
}

module.exports = Produto;