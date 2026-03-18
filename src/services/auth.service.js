const authRepository = require('../repositories/auth.repository');

const login = async (body) => {
    const data = await authRepository.login(body.password, body.email);

    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET;

    const modules = data.roles.map(r => r.modules)[0];

    const token = jwt.sign({
        id: data.id,
        name: data.name,
        modules: Array.from(new Set(modules.map(m => m.type)))
    }, JWT_SECRET, {
        expiresIn:'24h'
    });

    return {
        message: 'Seja bem-vindo!',
        data: data,
        token: token
    }
}

module.exports = {
    login
}