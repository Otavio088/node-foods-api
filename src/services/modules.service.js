const modulesRepository = require('../repositories/modules.repository');

const getAll = async () => {
    const data = await modulesRepository.getAll();

    if (data && data.length === 0) {
        return {
            message: 'Nenhum Módulo foi encontrado!',
            data: []
        }
    }

    return {
        message: 'Módulos encontrados com sucesso!',
        data: data
    }
}

module.exports = {
    getAll
}