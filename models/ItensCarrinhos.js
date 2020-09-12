const { Model, DataTypes } = require('sequelize');
const Carrinhos = require('./Carrinhos');

class ItensCarrinhos extends Model {
    static init(connection) {
        super.init({
            idProduto: DataTypes.INTEGER,
            idCarrinho: DataTypes.INTEGER,
            quantidade: DataTypes.INTEGER,
            excluido: DataTypes.BOOLEAN
        }, { sequelize: connection })
    };
    static associate(models) {
        this.belongsTo(models.Carrinhos, { foreignKey: "id", as: "idCarrinho" });
    }
}


module.exports = ItensCarrinhos;