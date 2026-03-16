const authRepository = require('../repositories/auth.repository');

const login = async (body) => {
    const data = await authRepository.login(body.password, body.email);

    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign({
        id: data.id,
        name: data.name,
        email: data.email
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