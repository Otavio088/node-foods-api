const Products = require('../models/Products');

const getAll = async () => {
    return await Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('user(defaultSelects)');
}

const getById = async (productId) => {
    const product = await Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .findById(productId)
        .whereNull('deleted_at')
        .withGraphFetched('user(defaultSelects)');


    if (!product)
        throw new Error('Produto inexistente!');

    return product;
}

const create = async (body) => {
    const newProduct = await Products.query()
        .insert(body);

    return await Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .findById(newProduct.id)
        .withGraphFetched('user(defaultSelects)');
}

const update = async (body, productId) => {
    const productToUpdate = await Products.query()
        .select('id')
        .findById(productId)
        .whereNull('deleted_at');

    if (!productToUpdate)
        throw new Error('Produto inexistente!');

    await Products.query()
        .patch(body)
        .where('id', productToUpdate.id);

    return await Products.query()
        .select('id', 'name', 'description', 'image', 'price', 'created_at', 'updated_at')
        .findById(productToUpdate.id)
        .withGraphFetched('user(defaultSelects)');
}

const remove = async (productId) => {
    const existProduct = await Products.query()
        .select('id')
        .findById(productId)
        .whereNull('deleted_at');

    if (!existProduct)
        throw new Error('Produto inexistente!');

    await Products.query()
        .patch({
            deleted_at: new Date()
        })
        .where('id', productId);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
