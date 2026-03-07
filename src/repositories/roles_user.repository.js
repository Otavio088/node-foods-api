const knex = require('../configs/knexfile');

const getAll = async () => {
    return knex('roles_user').select()
        .whereNull('deleted_at');
}

module.exports = {
    getAll
}