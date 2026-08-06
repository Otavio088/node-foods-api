const ingredientsService = require('../services/ingredients.service');

const getAll = async (req, res, next) => {
    try {
        const result = await ingredientsService.getAll();

        return res.status(200).send({
            message: result.length > 0 ? 'Ingredientes encontrados com sucesso!' : 'Nenhum ingrediente foi encontrado!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await ingredientsService.getById(req.params.id);

        return res.status(200).send({
            message: 'Ingrediente encontrado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await ingredientsService.create(req.body);

        return res.status(201).send({
            message: 'Ingrediente criado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await ingredientsService.update(req.body, req.params.id);

        return res.status(200).send({
            message: 'Ingrediente atualizado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        await ingredientsService.remove(req.params.id);

        return res.status(200).send({
            message: 'Ingrediente excluído com sucesso!'
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
