const ingredientsService = require('../services/ingredients.service');

const getAll = async (req, res) => {
    try {
        const result = await ingredientsService.getAll();

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
        const result = await ingredientsService.getById(req.params.id);

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
        const result = await ingredientsService.create(req.body);

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

const update = async (req, res) => {
    try {
        const result = await ingredientsService.update(req.body, req.params.id);

        return res.status(200).send({
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
        const result = await ingredientsService.remove(req.params.id);

        return res.status(200).send({
            message: result.message
        })
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
