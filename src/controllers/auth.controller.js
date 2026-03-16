const authService = require('../services/auth.service');

const login = async (req, res) => {
    try {
        const body = req.body;

        const result = await authService.login(body);

        res.cookie('token', result.token, {
            httpOnly: true, // Impede javascript de acessar o cookie
            secure: false, // Cookie pode trafegar em http?
            sameSite: 'lax', // Proteção contra CSRF
            maxAge: 24 * 60 * 60 * 1000 // 24h de duração
        });

        return res.status(200).send({
            message: result.message,
            data: result.data
        });
    } catch (err) {
        return res.status(500).send({
            message: 'Desculpe, ocorreu algum erro desconhecido. Tente novamente mais tarde.',
            data: {}
        });
    }
}

module.exports = {
    login
}