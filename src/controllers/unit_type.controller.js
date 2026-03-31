const unitTypesService = require('../services/unit_type.service');

const getAll = async (req, res) => {
    try {
        const result = await unitTypesService.getAll();

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
        const unitTypeId = req.params.id;

        const result = await unitTypesService.getById(unitTypeId);

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

        const result = await unitTypesService.create(body);

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
        const body = req.body;
        const params = req.params;

        const result = await unitTypesService.update(body, params.id);

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
        const unitTypeId = req.params.id;

        const result = await unitTypesService.remove(unitTypeId);

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
