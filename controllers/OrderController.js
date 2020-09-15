const Pedidos = require('../models/Pedidos');
const ItensPedidos = require('../models/ItensPedidos');

async function listOrders(req, res, next) {
    try{
    const result = await Pedidos.findAll({
        order: ['createdAt'],
        attributes: ["id", "createdAt", "status", "valorTotal"],
        include: {
            model: ItensPedidos,
            attributes: ["nome"]
        }
    });
    res.status(200).send(result)
    }catch(error){
        res.send(error);
    }
}

async function changeStatus(req, res, next) {

    try {
        const { id, status } = req.body;
        const result = await Pedidos.findByPk({ id });

        res.status(200).send(result)
    } catch (error) {
        res.send(error);
    }
}

module.exports = { listOrders };