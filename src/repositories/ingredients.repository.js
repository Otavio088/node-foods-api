const Ingredients = require ('../models/Ingredients');
const UnitTypes = require('../models/UnitTypes');

const getAll = async () => {
    return await Ingredients.query()
        .select('id', 'name', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('unit_type(defaultSelectsUnitTypes)');
}

const getById = async (id) => {
    const ingredient = await Ingredients.query()
        .select('id', 'name', 'created_at', 'updated_at')
        .findById(id)
        .whereNull('deleted_at')
        .withGraphFetched('unit_type(defaultSelectsUnitTypes)');


    if (!ingredient)
        throw new Error('Ingrediente inexistente!');

    return ingredient;
}

const create = async (body) => {
    const unitType = await UnitTypes.query()
        .select('id')
        .findOne({
            id: body.unit_type_id,
            deleted_at: null
        });

    if (!unitType)
        throw new Error('Unidade de Medida inexistente!');

    const newIngredient = await Ingredients.query()
        .insert(body);

    return await Ingredients.query()
        .select('id', 'name', 'created_at', 'updated_at')
        .findById(newIngredient.id)
        .withGraphFetched('unit_type(defaultSelectsUnitTypes)');
}

const update = async (body, id) => {
    const unitType = await UnitTypes.query()
        .select('id')
        .findOne({
            id: body.unit_type_id,
            deleted_at: null
        });

    if (!unitType)
        throw new Error('Unidade de Medida inexistente!');

    const ingredient = await Ingredients.query()
        .select('id')
        .findOne({
            id: id,
            deleted_at: null
        });

    if (!ingredient)
        throw new Error('Ingrediente inexistente!');

    await Ingredients.query()
        .patch(body)
        .where('id', ingredient.id);

    return Ingredients.query()
        .select('id', 'name', 'created_at', 'updated_at')
        .findById(ingredient.id)
        .withGraphFetched('unit_type(defaultSelectsUnitTypes)');
}

const remove = async (id) => {
    const existIngredient = await Ingredients.query()
        .select('id')
        .findById(id)
        .whereNull('deleted_at');

    if (!existIngredient)
        throw new Error('Ingrediente inexistente!');

    await Ingredients.query()
        .patch({
            deleted_at: new Date()
        })
        .where('id', existIngredient.id);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
