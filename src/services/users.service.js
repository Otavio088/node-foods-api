const usersRepository = require('../repositories/users.repository');
const bcrypt = require('bcrypt');
const getAll = async () => {
    const data = await usersRepository.getAll();

    if (data && data.length === 0) {
        return {
            message: 'Nenhum Usuário foi encontrado!',
            data: []
        }
    }

    return {
        message: 'Usuários encontrados com sucesso!',
        data: data
    }

}

const create = async (body) => {
    const salt = await bcrypt.genSalt();

    const bodyFormatted = {
        name: body.name ? String(body.name).trim() : '',
        roles_ids: body.roles_ids,
        email: body.email ? String(body.email).trim() : '',
        password: body.password ? await bcrypt.hash(String(body.password, salt).trim()) : '',
        active: body.active !== undefined ? Boolean(body.active) : true,
    }

    const data = await usersRepository.create(bodyFormatted);

    return {
        message: 'Usuários criado com sucesso!',
        data: data
    }
}

module.exports = {
    getAll,
    create
}