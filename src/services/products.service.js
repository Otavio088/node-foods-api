const HttpError = require('../classes/HttpError');
const productsRepository = require('../repositories/products.repository');
const productCategoriesRepository = require('../repositories/product_categories.repository');

const getAll = async () => {
    return productsRepository.getAll();
}

const getById = async (productId) => {
    const data = await productsRepository.getById(productId);

    if (!data)
        throw new HttpError('Produto inexistente!', 400);

    return data;
}

const create = async (body) => {
    const bodyFormatted = normalizeData(body);

    const categories = await productCategoriesRepository.getByCodes(bodyFormatted.categories);

    bodyFormatted.categories = categories.map(c => c.id);

    const newProductId = await productsRepository.create(bodyFormatted);

    return productsRepository.getById(newProductId);
}

const update = async (body, productId) => {
    const productExist = await productsRepository.getById(productId);

    if (!productExist)
        throw new HttpError('Produto inexistente!', 400);

    const bodyFormatted = normalizeData(body, productExist);

    const categories = await productCategoriesRepository.getByCodes(bodyFormatted.categories);

    bodyFormatted.categories = categories.map(c => c.id);

    await productsRepository.update(bodyFormatted, productId);

    return productsRepository.getById(productId);
}

const remove = async (productId) => {
    const productExist = await productsRepository.getById(productId);

    if (!productExist)
        throw new HttpError('Produto inexistente!', 400);

    productsRepository.remove(productId);
}

function normalizeData(body, product = null) {
    return {
        name: body.name ? body.name.trim() 
            : product?.name ? product.name : '',
        description: body.description ? body.description.trim() 
            : product?.description ? product.description : '',
        price: body.price ? body.price 
            : product?.price ? product.price : 0,
        user_id: Object.keys(body).length > 1 && body.user_id ? body.user_id 
            : product?.user?.id  ? product.user.id : 0,
        image: body.image ? body.image 
            : product?.image ? product.image : '',
        ingredients: body.ingredients ? body.ingredients.reduce((acc, i) => {
            if (i.id !== undefined && i.quantity !== undefined) {
                acc.push({
                    ingredient_id: i.id,
                    quantity: i.quantity.toFixed(2)
                });
            }
            return acc;
        }, []) : product?.ingredients ? product.ingredients.reduce((acc, i) => {
                acc.push({
                    ingredient_id: i.id,
                    quantity: i.quantity.toFixed(2)
                });
            return acc;
        }, []) : [],
        categories: body.categories ? body.categories.map(c => c.trim())
            : product?.categories ? product.categories.map(c => c.trim())
            : []
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
