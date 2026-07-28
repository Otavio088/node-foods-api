const usersService = require('../services/users.service');

const getAll = async (req, res, next) => {
    try {
        const result = await usersService.getAll();

        return res.status(200).send({
            message: result.length > 0 ? 'Usuários encontrados com sucesso!' : 'Nenhum Usuário foi encontrado!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const getById = async (req, res, next) => {
    try {
        const result = await usersService.getById(req.params.id);

        return res.status(200).send({
            message: 'Usuário encontrado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await usersService.create(req.body);

        return res.status(201).send({
            message: 'Usuário criado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await usersService.update(req.body, req.params.id);

        return res.status(200).send({
            message: 'Usuário atualizado com sucesso!',
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const remove = async (req, res, next) => {
    try {
        const result = await usersService.remove(req.params.id);

        return res.status(200).send({
            message: 'Usuário removido com sucesso!'
        });
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