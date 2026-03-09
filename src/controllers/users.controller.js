const usersService = require('../services/users.service');

const getAll = async (req, res) => {
    try {
        const result = await usersService.getAll();

        return res.status(200).send({
            message: result.message,
            data: result.data
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: []
        });
    }
}

const create = async (req, res) => {
    try {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            return res.status(400).send({
                message: 'Nenhum dado foi enviado para a criação do Usuário!',
                data: {}
            });
        }

        if (!body.role_id) {
            return res.status(400).send({
                message: 'Tipo de Usuário é obrigatório!',
                field: 'role_id',
                data: {}
            });
        }

        if (!body.name) {
            return res.status(400).send({
                message: 'Nome de Usuário é obrigatório!',
                field: 'name',
                data: {}
            });
        }

        if (!body.email) {
            return res.status(400).send({
                message: 'E-mail de Usuário é obrigatório!',
                field: 'email',
                data: {}
            });
        }

        if (!body.password) {
            return res.status(400).send({
                message: 'Senha do Usuário é obrigatório!',
                field: 'password',
                data: {}
            });
        }

        if (!body.password_confirm) {
            return res.status(400).send({
                message: 'Confirmação de Senha do Usuário é obrigatório!',
                field: 'password_confirm',
                data: {}
            });
        }

        const result = await usersService.create(body);

        return res.status(200).send({
            message: result.message,
            data: result.data
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: []
        });
    }
}

module.exports = {
    getAll,
    create
}