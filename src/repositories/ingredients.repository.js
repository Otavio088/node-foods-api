const Ingredients = require ('../models/Ingredients');
const UnitTypes = require('../models/UnitTypes');

const getAll = async () => {
    return Ingredients.query()
        .select('id', 'name', 'created_at', 'updated_at')
        .whereNull('deleted_at')
        .withGraphFetched('unit_type(defaultSelectsUnitTypes)');
}

const getById = async (ingredientId) => {
    return Ingredients.query()
        .select('id', 'name', 'created_at', 'updated_at')
        .findById(ingredientId)
        .whereNull('deleted_at')
        .withGraphFetched('unit_type(defaultSelectsUnitTypes)');
}

const getByName = async (ingredientName, ingredientId = null) => {
    const query = Ingredients.query()
        .select('id')
        .findOne({
            name: ingredientName,
            deleted_at: null
        });

    if (ingredientId)
        query.whereNot('id', ingredientId);

    return query;
}

const create = async (body) => {
    return Ingredients.query()
        .insert(body);
}

const update = async (body, ingredientId) => {
    await Ingredients.query()
        .patch(body)
        .where('id', ingredientId);
}

const remove = async (ingredientId) => {
    await Ingredients.query()
        .patch({ deleted_at: new Date() })
        .where('id', ingredientId);
}

module.exports = {
    getAll,
    getById,
    getByName,
    create,
    update,
    remove
}
