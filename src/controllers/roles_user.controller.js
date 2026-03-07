const rolesUserService = require('../services/roles_user.service');

const getAll = async (req, res) => {
    try {
        const result = await rolesUserService.getAll();

        return res.status(200).send({
            message: result.message,
            error: false,
            data: result.data
        });
    } catch (err) {
        console.log('err: ', err);
        return res.status(500).send({
            message: 'Desculpe, ocorreu algum erro desconhecido',
            error: true,
            data: []
        });
    }
}

module.exports = {
    getAll
}