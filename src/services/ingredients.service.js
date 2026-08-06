const ingredientsRepository = require('../repositories/ingredients.repository');
const unitTypesRepository = require('../repositories/unit_types.repository');
const HttpError = require('../classes/HttpError');

const getAll = async () => {
    return ingredientsRepository.getAll();
}

const getById = async (ingredientId) => {
    const data = await ingredientsRepository.getById(ingredientId);

    if (!data)
        throw new HttpError('Ingrediente inexistente!', 400);

    return data;
}

const create = async (body) => {
    const bodyFormatted = normalizeData(body);

    const unitTypeExist = await unitTypesRepository.getById(bodyFormatted.unit_type_id);

    if (!unitTypeExist)
        throw new HttpError('Unidade de medida inexistente!', 400);

    const ingredientExist = await ingredientsRepository.getByName(bodyFormatted.name);

    if (ingredientExist)
        throw new HttpError('Já existe um ingrediente com este nome', 409);

    const newIngredient = await ingredientsRepository.create(bodyFormatted);

    return ingredientsRepository.getById(newIngredient.id);
}

const update = async (body, ingredientId) => {
    const ingredientExist = await ingredientsRepository.getById(ingredientId);

    if (!ingredientExist)
        throw new HttpError('Ingrediente inexistente!', 400);

    if (body.name) {
        const ingredientNameExist = await ingredientsRepository.getByName(body.name.trim(), ingredientId);

        if (ingredientNameExist)
            throw new HttpError('Já existe um ingrediente com este nome', 409);
    }

    if (body.unit_type_id) {
        const unitTypeExist = await unitTypesRepository.getById(body.unit_type_id);

        if (!unitTypeExist)
            throw new HttpError('Unidade de medida inexistente!', 400);
    }

    const bodyFormatted = normalizeData(body, ingredientExist);

    await ingredientsRepository.update(bodyFormatted, ingredientId);

    return ingredientsRepository.getById(ingredientId);
}

const remove = async (ingredientId) => {
    const ingredientExist = await ingredientsRepository.getById(ingredientId);

    if (!ingredientExist)
        throw new HttpError('Ingrediente inexistente!', 400);

    await ingredientsRepository.remove(ingredientId);
}

function normalizeData (body, ingredient = null) {
    return {
        name: body.name ? body.name.trim() 
            : ingredient?.name ? ingredient.name : '',
        unit_type_id: body.unit_type_id ? body.unit_type_id 
            : ingredient?.unit_type?.id ? ingredient?.unit_type?.id : null
    };
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
