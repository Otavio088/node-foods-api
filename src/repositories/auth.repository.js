const Users = require('../models/Users');

const login = async (password, email) => {
    const user = await Users.query()
        .select('id', 'name', 'email', 'password', 'active', 'created_at', 'updated_at')
        .findOne({
            email: email.trim(),
            deleted_at: null
        })
        .withGraphFetched('roles.modules');

    if (!user)
        throw new Error('E-mail de Usuário inexistente!');

    if (user.active === 0)
        throw new Error('Usuário inativo!');

    const bcrypt = require('bcrypt');

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword)
        throw new Error('Senha incorreta!');

    delete user.password;

    return user;
}

module.exports = {
    login
}