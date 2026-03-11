const usersService = require('../services/users.service');

const getAll = async (req, res) => {
    try {
        const result = await usersService.getAll();

        return res.status(200).send({
            message: result.message,
            data: result.data
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: []
        });
    }
}

const create = async (req, res) => {
    try {
        const body = req.body;

        const result = await usersService.create(body);

        return res.status(200).send({
            message: result.message,
            data: result.data
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: {}
        });
    }
}

module.exports = {
    getAll,
    create
}