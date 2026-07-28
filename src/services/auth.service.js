const authRepository = require('../repositories/auth.repository');
const HttpError = require('../classes/HttpError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (body) => {
    const user = await authRepository.login(body.email.trim());

    if (!user)
        throw new HttpError('E-mail de Usuário inexistente!', 400);

    if (!user.active)
        throw new HttpError('Usuário inativo!', 401);

    const matchPassword = await bcrypt.compare(body.password, user.password);

    if (!matchPassword)
        throw new HttpError('Senha incorreta!', 400);

    delete user.password;

    const modules = user.roles.map(r => r.modules).flat();

    const token = jwt.sign({
        id: user.id,
        name: user.name,
        modules: modules ? Array.from(new Set(modules.map(m => m.type))) : []
    }, JWT_SECRET, {
        expiresIn:'24h'
    });

    return {
        data: user,
        token: token
    }
}

module.exports = {
    login
}