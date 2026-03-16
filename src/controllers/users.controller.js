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

const getById = async (req, res) => {
    try {
        const userId = req.params.id;

        const result = await usersService.getById(userId);

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

const update = async (req, res) => {
    try {
        const body = req.body;
        const params = req.params;

        const result = await usersService.update(body, params.id);

        return res.status(201).send({
            message: result.message,
            data: result.data
        })
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: {}
        });
    }
}

const remove = async (req, res) => {
    try {
        const userId = req.params.id;

        const result = await usersService.remove(userId);

        return res.status(200).send({
            message: result.message
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
        });
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}