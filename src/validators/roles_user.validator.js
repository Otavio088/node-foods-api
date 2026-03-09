const Roles = require('../models/Roles');

const validationCreate = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado!' });

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome do Tipo de Usuário é obrigatório!', field: 'name' });

    if (!body.modules_ids || !Array.isArray(body.modules_ids))
        return res.status(400).send({ message: 'IDs dos Módulos do Sistema são obrigatórios e deve ser um array!', field: 'modules_ids' });

    if (body.modules_ids.length === 0)
        return res.status(400).send({ message: 'IDs dos Módulos do Sistema está vazio!', field: 'modules_ids' });

    const role = await Roles.query()
        .findOne({
            name: body.name.trim(),
            deleted_at: null
        });

    if (role)
        return res.status(400).send({ message: 'Já existe um Tipo de Usuário com este nome!' });

    return next();
}

module.exports = {
    validationCreate
}