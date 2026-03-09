const rolesUserService = require('../services/roles_user.service');

const getAll = async (req, res) => {
    try {
        const result = await rolesUserService.getAll();

        return res.status(200).send({
            message: result.message,
            data: result.data
        });
    } catch (err) {
        return res.status(500).send({
            // message: 'Desculpe, ocorreu algum erro desconhecido. Tente novamente mais tarde',
            message: err.message,
            data: []
        });
    }
}

const create = async (req, res, next) => {
    try {
        const body = req.body;

        const result = await rolesUserService.create(body);

        return res.status(201).send({
            message: result.message,
            data: result.data
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: []
        });
    }
}

module.exports = {
    getAll,
    create
}