const usersRepository = require('../repositories/users.repository');

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
    const bcrypt = require('bcrypt');

    const salt = await bcrypt.genSalt();
    const password = String(body.password).trim();

    const bodyFormatted = {
        name: body.name ? String(body.name).trim() : '',
        roles_ids: body.roles_ids,
        email: body.email ? String(body.email).trim() : '',
        password: body.password && !isBcryptHash(body.password) ? 
            await bcrypt.hash(password, salt) : '',
        active: body.active == 1 || body.active == 0 ? body.active : 1,
    }

    return bodyFormatted;
}

// Validação para saber se a senha já está criptografada
function isBcryptHash(str) {
  return /^\$2[aby]\$\d{2}\$/.test(str);
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}