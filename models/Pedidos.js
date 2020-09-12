const { Model, DataTypes } = require('sequelize');

class Pedidos extends Model {
    static init(connection) {
        super.init({
            idCarrinho: DataTypes.INTEGER,
            formaPagamento: DataTypes.STRING,
            enderecoEntrega: DataTypes.TEXT,
            valorTotal: DataTypes.FLOAT,
            status: DataTypes.STRING, 
            status: DataTypes.STRING,
            excluido: DataTypes.BOOLEAN
        }, {sequelize: connection })
    };
    static associate(models) {
        this.hasOne(models.Carrinhos, { foreignKey: "id", as: "carrinhoFinalizado" });
        this.hasMany(models.ItensPedidos, { foreignKey: "idPedido", as: "itensPedido" });
    }
}
 
module.exports = Pedidos;