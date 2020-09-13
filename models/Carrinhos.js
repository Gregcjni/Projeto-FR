const { Model, DataTypes } = require('sequelize');
const ItensCarrinhos = require('./ItensCarrinhos');

class Carrinhos extends Model {
    static init(connection) {
        super.init({
            idCliente: DataTypes.INTEGER,
            status: DataTypes.STRING,
            excluido: DataTypes.BOOLEAN
        }, { sequelize: connection })
    }

    static associate(models) {
        this.hasMany(models.ItensCarrinhos, { foreignKey: "idCarrinho", as: "itensCarrinho" });
        this.hasOne(models.Pedidos, { foreignKey: "idCarrinho", as: "pedidoGerado" });
    }
};

module.exports = Carrinhos;