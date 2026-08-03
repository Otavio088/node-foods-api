const unitTypesService = require('../services/unit_type.service');

const getAll = async (req, res, next) => {
    try {
        const result = await unitTypesService.getAll();

        return res.status(200).send({
            message: result.length > 0 ? 'Unidades de medida encontradas com sucesso!' : 'Nenhuma unidade de medida foi encontrada!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await unitTypesService.getById(req.params.id);

        return res.status(200).send({
            message: 'Unidade de medida encontrada com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await unitTypesService.create(req.body);

        return res.status(201).send({
            message: 'Unidade de medida criada com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await unitTypesService.update(req.body, req.params.id);

        return res.status(200).send({
            message: 'Unidade de medida atualizada com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        await unitTypesService.remove(req.params.id);

        return res.status(200).send({
            message: 'Unidade de medida excluída com sucesso!'
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
