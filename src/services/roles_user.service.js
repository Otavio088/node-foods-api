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

const create = async (body) => {
    const roleName = body.name.trim();
    const bodyFormatted = {
        name: roleName,
        type: roleName.toLowerCase().replace(' ', '_'),
        modules_ids: body.modules_ids
    }

    const data = await rolesUserRepository.create(bodyFormatted);

    return {
        message: 'Tipo de Usuário criado com sucesso!',
        data: data
    }
}

module.exports = {
    getAll,
    create
}