const createAndUpdate = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado!', data: {} });

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome do Ingrediente é obrigatório!', field: 'name', data: {} });

    if (!body.unit_type_id || typeof body.unit_type_id !== 'number')
        return res.status(400).send({ message: 'Unidade de Medida é obrigatório!', field: 'unit_type_id', data: {} });

    return next();
}

module.exports = {
    createAndUpdate
}
