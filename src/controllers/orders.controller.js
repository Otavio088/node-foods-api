const ordersService = require('../services/orders.service');

const getAll = async (req, res, next) => {
    try {
        const result = await ordersService.getAll();

        return res.status(200).send({
            message: result.length > 0 ? 'Pedidos encontrados com sucesso!' : 'Nenhum Pedido foi encontrado!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await ordersService.getById(req.params.id);

        return res.status(200).send({
            message: 'Pedido encontrado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await ordersService.create(req.body);

        return res.status(201).send({
            message: 'Pedido criado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await ordersService.update(req.body, req.params.id);

        return res.status(200).send({
            message: 'Pedido atualizado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        await ordersService.remove(req.params.id);

        return res.status(200).send({
            message: 'Pedido excluído com sucesso!'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
