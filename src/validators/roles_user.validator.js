const create = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado!', data: {} });

    if (!body.name || typeof body.name !== 'string' || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome do Tipo de Usuário é obrigatório!', field: 'name', data: {} });

    if (!body.modules_ids || !Array.isArray(body.modules_ids))
        return res.status(400).send({ message: 'IDs dos Módulos do Sistema são obrigatórios e deve ser um array!', field: 'modules_ids', data: {} });

    if (body.modules_ids.length === 0)
        return res.status(400).send({ message: 'IDs dos Módulos do Sistema está vazio!', field: 'modules_ids', data: {} });

    return next();
}

const update = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado!', data: {} });

    if ((body.name && ((typeof body.name === 'string' && body.name.trim() === '') || typeof body.name !== 'string')) || !body.name)
        return res.status(400).send({ message: 'Nome do Tipo de Usuário inválido!', field: 'name', data: {} });

    if (!body.modules_ids || (body.modules_ids && Array.isArray(body.modules_ids) && body.modules_ids.length === 0))
        return res.status(400).send({ message: 'Modulos do Sistema é obrigatório!', field: 'modules_ids', data: {} });

    if ((body.modules_ids && !Array.isArray(body.modules_ids)) || body.modules_ids === '')
        return res.status(400).send({ message: 'Modulos do Sistema é obrigatório e deve ser um array!', field: 'modules_ids', data: {} });

    return next();
}

module.exports = {
    create,
    update
}
