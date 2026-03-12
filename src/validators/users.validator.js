const create = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado para a criação do Usuário!', data: {} });

    if (!body.roles_ids || !Array.isArray(body.roles_ids))
        return res.status(400).send({ message: 'Tipos de Usuário é obrigatório e deve ser um array!', field: 'roles_ids', data: {} });

    if (body.roles_ids.length === 0)
        return res.status(400).send({ message: 'Tipos de Usuário é obrigatório!', field: 'roles_ids', data: {} });

    if (!body.name || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome de Usuário é obrigatório!', field: 'name', data: {} });

    if (!body.email)
        return res.status(400).send({ message: 'E-mail de Usuário é obrigatório!', field: 'email', data: {} });

    if (!body.password)
        return res.status(400).send({ message: 'Senha do Usuário é obrigatório!', field: 'password', data: {} });

    if (!body.password_confirm)
        return res.status(400).send({ message: 'Confirmação de Senha do Usuário é obrigatório!', field: 'password_confirm', data: {} });

    if (String(body.password) !== String(body.password_confirm))
        return res.status(400).send({ message: 'Senha e Confirmação de Senha devem ser iguais!', field: 'password, password_confirm', data: {} });

    return next();
}

const update = async (req, res, next) => {
    const body = req.body;

    if (!body || Object.keys(body).length === 0)
        return res.status(400).send({ message: 'Nenhum dado foi enviado para a atualização do Usuário!', data: {} });

    if (!body.roles_ids || !Array.isArray(body.roles_ids))
        return res.status(400).send({ message: 'Tipos de Usuário é obrigatório e deve ser um array!', field: 'roles_ids', data: {} });

    if (body.roles_ids.length === 0)
        return res.status(400).send({ message: 'Tipos de Usuário é obrigatório para atualização!', field: 'roles_ids', data: {} });

    if (!body.name || body.name.trim() === '')
        return res.status(400).send({ message: 'Nome de Usuário é obrigatório para atualização!', field: 'name', data: {} });

    if (!body.email)
        return res.status(400).send({ message: 'E-mail de Usuário é obrigatório para atualização!', field: 'email', data: {} });

    if (!body.password)
        return res.status(400).send({ message: 'Senha do Usuário é obrigatório para atualização!', field: 'password', data: {} });

    if (!body.password_confirm)
        return res.status(400).send({ message: 'Confirmação de Senha do Usuário é obrigatório para atualização!', field: 'password_confirm', data: {} });

    if (String(body.password) !== String(body.password_confirm))
        return res.status(400).send({ message: 'Senha e Confirmação de Senha devem ser iguais!', field: 'password, password_confirm', data: {} });

    return next();
}

module.exports = {
    create,
    update
}
