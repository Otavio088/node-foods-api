const modulesRepository = require('../repositories/modules.repository');

const getAll = async () => {
    return modulesRepository.getAll();
}

module.exports = {
    getAll
}