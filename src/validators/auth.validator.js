const login = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado para o login de Usuário!', data: {} });

    if (!body.email)
        return res.status(400).send({ message: 'E-mail de Usuário é obrigatório!', field: 'email', data: {} });

    if (!body.password)
        return res.status(400).send({ message: 'Senha do Usuário é obrigatória!', field: 'password', data: {} });

    return next();
}

module.exports = {
    login
}