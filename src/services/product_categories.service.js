const HttpError = require('../classes/HttpError');
const ProductCategoriesRepository = require('../repositories/product_categories.repository');

const getAll = async () => {
    return ProductCategoriesRepository.getAll();
}

const getOne = async (code) => {
    const data = await ProductCategoriesRepository.getOne(code);

    if (!data)
        throw new HttpError('Categoria de produtos inexistente!', 400);

    return data;
}

const create = async (body) => {
    const bodyFormatted = normalizeData(body);

    const categoryExist = await ProductCategoriesRepository.getOne(bodyFormatted.code);

    if (categoryExist)
        throw new HttpError('Já existe uma categoria com este código!', 400);

    const newCategory = await ProductCategoriesRepository.create(bodyFormatted);

    return ProductCategoriesRepository.getOne(newCategory.code);
}

const update = async (body, code) => {
    const categoryExist = await ProductCategoriesRepository.getOne(code);

    if (!categoryExist)
        throw new HttpError('Categoria de produtos inexistente!', 400);

    const bodyFormatted = normalizeData(body, categoryExist);

    await ProductCategoriesRepository.update(bodyFormatted, code);

    return ProductCategoriesRepository.getOne(code);
}

const remove = async (code) => {
    const categoryExist = await ProductCategoriesRepository.getOne(code);

    if (!categoryExist)
        throw new HttpError('Categoria de produtos inexistente!', 400);

    ProductCategoriesRepository.remove(code);
}

function normalizeData(body, category = null) {
    return {
        code: category?.code ? category.code
            : body.code ? body.code.trim() : '',
        name: body.name ? body.name.trim()
            : category?.name ? category.name : '',

    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}
