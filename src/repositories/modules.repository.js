const Modules = require('../models/Modules');

const getAll = async () => {
    return Modules.query();
}

module.exports = {
    getAll
}
