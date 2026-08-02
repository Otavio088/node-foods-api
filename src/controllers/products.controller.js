const productsService = require('../services/products.service');

const getAll = async (req, res, next) => {
    try {
        const result = await productsService.getAll();

        return res.status(200).send({
            message: result.length > 0 ? 'Produtos encontrados com sucesso!' : 'Nenhum Produto foi encontrado!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await productsService.getById(req.params.id);

        return res.status(200).send({
            message: 'Produto encontrado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await productsService.create(req.body);

        return res.status(201).send({
            message: 'Produto criado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await productsService.update(req.body, req.params.id);

        return res.status(200).send({
            message: 'Produto atualizado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await productsService.remove(req.params.id);

        return res.status(200).send({
            message: 'Produto excluído com sucesso!'
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
