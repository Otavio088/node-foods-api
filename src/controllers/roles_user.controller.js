const rolesUserService = require('../services/roles_user.service');

const getAll = async (req, res, next) => {
    try {
        const result = await rolesUserService.getAll();

        return res.status(200).send({
            message: result.length > 0 ? 'Papéis de Usuário encontrados com sucesso!' : 'Nenhum Papel de Usuário foi encontrado!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await rolesUserService.getById(req.params.id);

        return res.status(200).send({
            message: 'Papel de Usuário encontrado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await rolesUserService.create(req.body);

        return res.status(201).send({
            message: 'Papel de Usuário criado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await rolesUserService.update(req.body, req.params.id);

        return res.status(200).send({
            message: 'Papel de Usuário atualizado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        await rolesUserService.remove(req.params.id);

        return res.status(200).send({
            message: 'Papel de Usuário excluído com sucesso!'
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
