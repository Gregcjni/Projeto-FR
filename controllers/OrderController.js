const Pedidos = require('../models/Pedidos');
const ItensPedidos = require('../models/ItensPedidos');
const { Op } = require('sequelize');

async function listOrders(req, res, next) {
    try {
        const { limit, offset } = req.body;
        /*Explicando os operadores: 
            Op = Operador padrão do pacote Sequelize
            Op.ne = Operador para "not equals";
            order = ordenação
            atributes = campos a serem retornados do modelo indicado
            include: inclui as dependencias de associação
            model: modelo "alvo" de associação
            include:[atributes]: os campos do modelo a serem retornados
            limit: limita o resultado à quantidade informada via body da requisição
            offset: "pula" a quantidade de registros informados e trás o restante
            Obs.: limit e offset utilizados para paginação do retorno;
        */

        const result = await Pedidos.findAll({
            where: {
                status: {
                    [Op.ne]: "Entregue",
                    [Op.ne]: "Cancelado",
                }
            },
            order: ['createdAt'],
            attributes: [
                "id",
                "createdAt",
                "status",
                "valorTotal"],
            include: {
                model: ItensPedidos,
                attributes: ["nome"]
            },
            limit, 
            offset
        });

        res.status(200).send(result)

    } catch (error) {
        res.send(error);
    }
}

async function changeStatus(req, res, next) {

    try {
        const { id, status } = req.body;
        let order = await Pedidos.findByPk(id);
        if (!order)
            return res.status(400).send({ message: "Pedido não encontrado" });

        const { canChange, statusRet } = verifyChange(status, order.status);
        if (canChange) {
            await Pedidos.update({ status: statusRet }, { where: { id } });
            order = await Pedidos.findByPk(id);
            res.status(200).send(order)
        } else {
            res.status(400).send({ message: "Troca de status inválida" });
        }

    } catch (error) {
        res.send(error);
    }
}

function verifyChange(newStatus, actualStatus) {

    /*para facilitar interação com a troca de status por parte do usuário, 
    dei numero aos status para que este possa indicar status via número*/

    var canChange = false;
    var statusRet = ";"
    switch (newStatus) {
        case 0: //'Cancelado':
            canChange = true;
            statusRet = "Cancelado"
            break;
        case 2://'Aceito':
            canChange = actualStatus == "Novo";
            statusRet = "Aceito"
            break;
        case 3://'Saiu para entrega':
            canChange = actualStatus == "Aceito";
            statusRet = "Saiu para entrega"
            break;
        case 4://'Entregue':
            canChange = actualStatus == "Saiu para entrega";
            statusRet = "Entregue"
            break;
        default:
            return false;
    }

    return { canChange, statusRet }
}

module.exports = { listOrders, changeStatus };