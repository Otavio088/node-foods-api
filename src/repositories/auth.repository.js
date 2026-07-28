const Users = require('../models/Users');

const login = async (email) => {
    return Users.query()
        .select('name', 'email', 'password', 'active', 'created_at', 'updated_at')
        .findOne({
            email: email,
            deleted_at: null
        })
        .withGraphFetched('roles.modules');
}

module.exports = {
    login
}