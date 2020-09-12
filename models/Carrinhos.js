const { Model, DataTypes } = require('sequelize');
const ItensCarrinhos = require('./ItensCarrinhos');

class Carrinhos extends Model {
    static init(connection) {
        super.init({
            idCliente: DataTypes.INTEGER,
            status: DataTypes.BOOLEAN,
            excluido: DataTypes.BOOLEAN
        }, { sequelize: connection })
    }

    static associate(models) {
        this.hasMany(models.ItensCarrinhos, { foreignKey: "idCarrinho", as: "idCarrinho" });
    }
};

module.exports = Carrinhos;