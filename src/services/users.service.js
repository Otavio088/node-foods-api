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

const getById = async (userId) => {
    const data = await usersRepository.getById(userId);

    return {
        message: 'Usuário encontrado com sucesso!',
        data: data
    }

}

const getByLogin = async (password, email) => {
    const data = await usersRepository.getByLogin(password, email);

    return {
        message: 'Seja bem-vindo!',
        data: data
    }

}

const create = async (body) => {
    const bodyFormatted = await formatBody(body);

    const data = await usersRepository.create(bodyFormatted);

    return {
        message: 'Usuário criado com sucesso!',
        data: data
    }
}

const update = async (body, roleId) => {
    const bodyFormatted = await formatBody(body);

    const data = await usersRepository.update(bodyFormatted, roleId);

    return {
        message: 'Usuário atualizado com sucesso!',
        data: data
    }
}

const remove = async (userId) => {
    await usersRepository.remove(userId);

    return {
        message: 'Usuário excluído com sucesso!'
    }

}

const formatBody = async (body) => {
    const salt = await bcrypt.genSalt();
    const password = String(body.password).trim();

    const bodyFormatted = {
        name: body.name ? String(body.name).trim() : '',
        roles_ids: body.roles_ids,
        email: body.email ? String(body.email).trim() : '',
        password: body.password ? await bcrypt.hash(password, salt) : '',
        active: body.active == 1 || body.active == 0 ? body.active : 1,
    }

    return bodyFormatted;
}

module.exports = {
    getAll,
    getById,
    getByLogin,
    create,
    update,
    remove
}