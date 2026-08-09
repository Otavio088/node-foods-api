const ProductCategoriesService = require('../services/product_categories.service');

const getAll = async (req, res, next) => {
    try {
        const result = await ProductCategoriesService.getAll();

        return res.status(200).send({
            message: result.length > 0 ? 'Categories de produtos encontradas com sucesso!' : 'Nenhuma categoria de produto foi encontrada!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const getOne = async (req, res, next) => {
    try {
        const result = await ProductCategoriesService.getOne(req.params.code);

        return res.status(200).send({
            message: 'Categoria de produtos encontrada com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await ProductCategoriesService.create(req.body);

        return res.status(201).send({
            message: 'Categoria de produtos criada com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await ProductCategoriesService.update(req.body, req.params.code);

        return res.status(200).send({
            message: 'Categoria de produtos atualizada com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        await ProductCategoriesService.remove(req.params.code);

        return res.status(200).send({
            message: 'Categoria de produtos excluída com sucesso!'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}
