const modulesService = require('../services/modules.service');

const getAll = async (req, res) => {
    try {
        const result = await modulesService.getAll();

        return res.status(200).send({
            message: result.length > 0 ? 'Módulos encontrados com sucesso!' : 'Nenhum Módulo foi encontrado!',
            data: result
        });
    } catch (err) {
        return res.status(500).send({
            message: err.message,
            data: []
        });
    }
}

module.exports = {
    getAll
}
