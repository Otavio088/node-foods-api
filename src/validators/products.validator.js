const create = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado!', data: {} });

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome do Produto é obrigatório!', field: 'name', data: {} });

    if (!body.price || typeof body.price !== 'number')
        return res.status(400).send({ message: 'Preço do Produto é obrigatório!', field: 'price', data: {} });

    if (!body.user_id || typeof body.user_id !== 'number')
        return res.status(400).send({ message: 'Código de Usuário é obrigatório!', field: 'user_id', data: {} });

    return next();
}

const update = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado!', data: {} });

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome do Produto é obrigatório!', field: 'name', data: {} });

    if (!body.price || typeof body.price !== 'number')
        return res.status(400).send({ message: 'Preço do Produto é obrigatório!', field: 'price', data: {} });

    if (!body.user_id || typeof body.user_id !== 'number')
        return res.status(400).send({ message: 'Código de Usuário é obrigatório!', field: 'user_id', data: {} });

    return next();
}

module.exports = {
    create,
    update
}
