const UnitTypes = require('../models/UnitTypes');

const getAll = async () => {
    return UnitTypes.query()
        .select('id', 'name', 'type', 'created_at', 'updated_at')
        .whereNull('deleted_at');
}

const getById = async (unitTypeId) => {
    return UnitTypes.query()
        .select('id', 'name', 'type', 'created_at', 'updated_at')
        .findById(unitTypeId)
        .whereNull('deleted_at');
}

const getByNameOrType = async (name, type, unitTypeId = null) => {
    const unitType = UnitTypes.query()
        .where(function(query) {
            query.where('name', name)
            .orWhere('type', type)
        })
        .whereNull('deleted_at')
        .first();

    if (unitTypeId)
        unitType.whereNot('id', unitTypeId);

    return unitType;
}

const create = async (body) => {
    return UnitTypes.query().insert(body);
}

const update = async (body, unitTypeId) => {
    await UnitTypes.query()
        .patch(body)
        .where('id', unitTypeId);
}

const remove = async (unitTypeId) => {
    await UnitTypes.query()
        .patch({ deleted_at: new Date() })
        .where('id', unitTypeId);
}

module.exports = {
    getAll,
    getById,
    getByNameOrType,
    create,
    update,
    remove
}
