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

module.exports = {
    getAll
}