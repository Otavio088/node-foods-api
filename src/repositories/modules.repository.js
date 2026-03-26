const Modules = require('../models/Modules');

const getAll = async () => {
    return await Modules.query();
}

module.exports = {
    getAll
}
