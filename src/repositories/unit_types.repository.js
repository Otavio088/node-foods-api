const UnitTypes = require('../models/UnitTypes');

const getAll = async () => {
    return await UnitTypes.query()
        .select('id', 'name', 'type', 'created_at', 'updated_at')
        .whereNull('deleted_at');
}

const getById = async (unitTypeId) => {
    const unitType = await UnitTypes.query()
        .select('id', 'name', 'type', 'created_at', 'updated_at')
        .findById(unitTypeId)
        .whereNull('deleted_at');


    if (!unitType)
        throw new Error('Unidade de Medida inexistente!');

    return unitType;
}

const create = async (body) => {
    const unitType = await UnitTypes.query()
        .where(function(query) {
            query.where('name', body.name)
            .orWhere('type', body.type)
        })
        .whereNull('deleted_at')
        .first();

    if (unitType)
        throw new Error('Já existe uma Unidade de Medida com este nome ou com esta abreviação');

    const newUnitType = await UnitTypes.query()
        .insert(body);

    return await UnitTypes.query()
        .select('id', 'name', 'type', 'created_at', 'updated_at')
        .findById(newUnitType.id);
}

const update = async (body, unitTypeId) => {
    const unitTypeToUpdate = await UnitTypes.query()
        .select('id')
        .findById(unitTypeId)
        .whereNull('deleted_at');

    if (!unitTypeToUpdate)
        throw new Error('Unidade de Medida inexistente!');

    const unitTypeExist = await UnitTypes.query()
        .where(function(query) {
            query.where('name', body.name)
            .orWhere('type', body.type)
        })
        .whereNot('id', unitTypeId)
        .whereNull('deleted_at')
        .first();

    if (unitTypeExist)
        throw new Error('Já existe uma Unidade de Medida com este nome ou com esta abreviação');

    await UnitTypes.query()
        .patch(body)
        .where('id', unitTypeToUpdate.id);

    return await UnitTypes.query()
        .select('id', 'name', 'type', 'created_at', 'updated_at')
        .findById(unitTypeToUpdate.id);
}

const remove = async (unitTypeId) => {
    const existUnitType = await UnitTypes.query()
        .select('id')
        .findById(unitTypeId)
        .whereNull('deleted_at');

    if (!existUnitType)
        throw new Error('Unidade de Medida inexistente!');

    await UnitTypes.query()
        .patch({
            deleted_at: new Date()
        })
        .where('id', unitTypeId);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
