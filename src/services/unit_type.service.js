const HttpError = require('../classes/HttpError');
const unitTypesRepository = require('../repositories/unit_types.repository');

const getAll = async () => {
    return unitTypesRepository.getAll();
}

const getById = async (unitTypeId) => {
    const data = await unitTypesRepository.getById(unitTypeId);

    if (!data)
        throw new HttpError('Unidade de medida inexistente!', 400);

    return data;
}

const create = async (body) => {
    const bodyFormatted = normalizeData(body);

    const unitTypeExist = await unitTypesRepository.getByNameOrType(bodyFormatted.name, bodyFormatted.type);

    if (unitTypeExist)
        throw new HttpError('Já existe uma unidade de medida com este nome ou com esta abreviação', 409);

    const newUnitType = await unitTypesRepository.create(bodyFormatted);

    return unitTypesRepository.getById(newUnitType.id);
}

const update = async (body, unitTypeId) => {
    const unitTypeExist = await unitTypesRepository.getById(unitTypeId);

    if (!unitTypeExist)
        throw new HttpError('Unidade de medida inexistente!', 400);

    const name = body.name ? body.name : '';
    const type = body.type ? body.type : '';

    const unitTypeExistNameOrType = await unitTypesRepository.getByNameOrType(name, type, unitTypeId);

    if (unitTypeExistNameOrType)
        throw new HttpError('Já existe uma unidade de medida com este nome ou com esta abreviação', 409);

    const bodyFormatted = normalizeData(body, unitTypeExist);

    await unitTypesRepository.update(bodyFormatted, unitTypeId);

    return unitTypesRepository.getById(unitTypeId);
}

const remove = async (unitTypeId) => {
    const unitTypeExist = await unitTypesRepository.getById(unitTypeId);

    if (!unitTypeExist)
        throw new HttpError('Unidade de medida inexistente!', 400);

    return unitTypesRepository.remove(unitTypeId);
}

function normalizeData (body, unitType = null) {
    return {
        name: body.name ? body.name.trim() 
            : unitType?.name ? unitType.name : '',
        type: body.type ? body.type.trim() 
            : unitType?.type ? unitType.type : ''
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
