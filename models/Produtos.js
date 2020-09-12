const { Model, DataTypes } = require('sequelize');

class Produtos extends Model {
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

module.exports = Produtos;