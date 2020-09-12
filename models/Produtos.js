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
        }, { sequelize: connection })
    };
    static associate(models) {
        this.hasOne(models.ItensCarrinhos, { foreignKey: "idProduto", as: "itemCarrinho" });
        this.hasOne(models.ItensPedidos, { foreignKey: "idProduto", as: "itemPedido" });
    }
}

module.exports = Produtos;