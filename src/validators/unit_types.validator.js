const create = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado!', data: {} });

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome da Unidade de Medida é obrigatório!', field: 'name', data: {} });

    if (!body.type || typeof body.type !== 'string' || body.type.trim() === '')
        return res.status(400).send({ message: 'Tipo de Unidade de Medida é obrigatório!', field: 'type', data: {} });

    return next();
}

const update = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado!', data: {} });

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome da Unidade de Medida é obrigatório!', field: 'name', data: {} });

    if (!body.type || typeof body.type !== 'string' || body.type.trim() === '')
        return res.status(400).send({ message: 'Tipo de Unidade de Medida é obrigatório!', field: 'type', data: {} });

    return next();
}

module.exports = {
    create,
    update
}
