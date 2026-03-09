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

const create = async () => {
    const data = await usersRepository.create();

    /*
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
    */
}

module.exports = {
    getAll,
    create
}