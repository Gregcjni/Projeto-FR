const { Model, DataTypes } = require('sequelize');

class Produtos extends Model {
    static init(connection) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.TEXT,
            preco: DataTypes.FLOAT,
            imagem: DataTypes.STRING,
            tags: DataTypes.STRING,
            status: DataTypes.STRING
        }, { sequelize: connection })
    };
    static associate(models) {
        this.belongsToMany(models.Carrinhos, { through: "ItensCarrinhos", foreignKey: "idProduto" });
        this.belongsToMany(models.Pedidos, { through: "ItensPedidos", foreignKey: "idProduto" });
    }
}

module.exports = Produtos;