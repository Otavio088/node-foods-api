const ingredientsRepository = require('../repositories/ingredients.repository');

const getAll = async () => {
    const data = await ingredientsRepository.getAll();

    if (data && data.length === 0) {
        return {
            message: 'Nenhum Ingrediente foi encontrad!',
            data: []
        }
    }

    return {
        message: 'Ingredientes encontrados com sucesso!',
        data: data
    }
}

const getById = async (id) => {
    const data = await ingredientsRepository.getById(id);

    return {
        message: 'Ingrediente encontrado com sucesso!',
        data: data
    }
}

const create = async (body) => {
    const bodyFormatted = formatBody(body);

    const data = await ingredientsRepository.create(bodyFormatted);

    return {
        message: 'Ingrediente cadastrado com sucesso!',
        data: data
    }
}

const update = async (body, id) => {
    const bodyFormatted = formatBody(body);

    const data = await ingredientsRepository.update(bodyFormatted, id);

    return {
        message: 'Ingrediente atualizado com sucesso!',
        data: data
    }
}

const remove = async (id) => {
    await ingredientsRepository.remove(id);

    return {
        message: 'Ingrediente excluído com sucesso!'
    }
}

function formatBody (body) {
    const ingredientName = body.name.trim();

    const bodyFormatted = {
        name: ingredientName,
        unit_type_id: body.unit_type_id
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
