const ProductCategories = require('../models/ProductCategories');
const ProductIngredients = require('../models/ProductIngredients');

const getAll = async () => {
    return ProductCategories.query()
        .select('code', 'name', 'created_at', 'updated_at')
        .whereNull('deleted_at');
}

const getOne = async (code) => {
    return ProductCategories.query()
        .select('code', 'name', 'created_at', 'updated_at')
        .findOne({
            code: code,
            deleted_at: null
        });
}

const getByCodes = async (codes) => {
    return ProductCategories.query()
        .select('id')
        .whereIn('code', codes);
}

const create = async (body) => {
    return ProductCategories.query()
        .insert(body);
}

const update = async (body, code) => {
    return ProductCategories.query()
        .patch(body)
        .where('code', code)
        .whereNull('deleted_at');
}

const remove = async (code) => {
    await ProductCategories.query()
        .patch({ deleted_at: new Date() })
        .where('code', code)
        .whereNull('deleted_at');
}

module.exports = {
    getAll,
    getOne,
    getByCodes,
    create,
    update,
    remove
}
