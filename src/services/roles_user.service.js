const rolesUserRepository = require('../repositories/roles_user.repository');

const getAll = async () => {
    const data = await rolesUserRepository.getAll();

    if (data && data.length === 0) {
        return {
            message: 'Nenhum Tipo de Usuário foi encontrado!',
            data: []
        }
    }

    return {
        message: 'Tipos de Usuário encontrados com sucesso!',
        data: data
    }
}

const getById = async (roleId) => {
    const data = await rolesUserRepository.getById(roleId);

    return {
        message: 'Tipo de Usuário encontrado com sucesso!',
        data: data
    }
}

const create = async (body) => {
    const bodyFormatted = formatBody(body);

    const data = await rolesUserRepository.create(bodyFormatted);

    return {
        message: 'Tipo de Usuário cadastrado com sucesso!',
        data: data
    }
}

const update = async (body, roleId) => {
    const bodyFormatted = formatBody(body);

    const data = await rolesUserRepository.update(bodyFormatted, roleId);

    return {
        message: 'Tipo de Usuário atualizado com sucesso!',
        data: data
    }
}

const remove = async (roleId) => {
    await rolesUserRepository.remove(roleId);

    return {
        message: 'Tipo de Usuário excluído com sucesso!'
    }
}

function formatBody (body) {
    const roleName = body.name ? body.name.trim() : '';
    const bodyFormatted = {
        name: roleName,
        modules_ids: body.modules_ids ? body.modules_ids : []
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
