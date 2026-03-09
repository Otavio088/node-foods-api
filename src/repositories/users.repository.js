const Users = require('../models/Users');

const getAll = async () => {
    const users = Users.query()
        .select('id', 'name',)
        .whereNull('deleted_at');

    return users;
}

const create = async () => {
    return Users.query().insert({

    })
}

module.exports = {
    getAll,
    create
}