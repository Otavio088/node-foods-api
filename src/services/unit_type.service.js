const unitTypesRepository = require('../repositories/unit_types.repository');

const getAll = async () => {
    const data = await unitTypesRepository.getAll();

    if (data && data.length === 0) {
        return {
            message: 'Nenhuma Unidade de Medida foi encontrada!',
            data: []
        }
    }

    return {
        message: 'Unidades de Medida encontradas com sucesso!',
        data: data
    }
}

const getById = async (unitTypeId) => {
    const data = await unitTypesRepository.getById(unitTypeId);

    return {
        message: 'Unidade de Medida encontrada com sucesso!',
        data: data
    }
}

const create = async (body) => {
    const bodyFormatted = formatBody(body);

    const data = await unitTypesRepository.create(bodyFormatted);

    return {
        message: 'Unidade de Medida cadastrada com sucesso!',
        data: data
    }
}

const update = async (body, unitTypeId) => {
    const bodyFormatted = formatBody(body);

    const data = await unitTypesRepository.update(bodyFormatted, unitTypeId);

    return {
        message: 'Unidade de Medida atualizada com sucesso!',
        data: data
    }
}

const remove = async (unitTypeId) => {
    await unitTypesRepository.remove(unitTypeId);

    return {
        message: 'Unidade de Medida excluída com sucesso!'
    }
}

function formatBody (body) {
    const unitTypeName = body.name.trim();
    const unitTypeType = body.type.trim();

    const bodyFormatted = {
        name: unitTypeName,
        type: unitTypeType
    }

    return bodyFormatted;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
