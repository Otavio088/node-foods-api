const { body } = require('express-validator');

const create = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nome do papel de usuário é obrigatório!'),

    body('modules_ids')
        .notEmpty()
        .withMessage('Os módulos do sistema são obrigatórios!')
        .isArray()
        .withMessage('Os módulos de sistema deve ser um array!')
        .isArray({min: 1})
        .withMessage('Informe pelo um módulo do sistema!')
];

const update = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Nome do papel de usuário é obrigatório!'),

    body('modules_ids')
        .optional()
        .notEmpty()
        .withMessage('Os módulos do sistema são obrigatórios!')
        .isArray()
        .withMessage('Os módulos de sistema deve ser um array!')
        .isArray({min: 1})
        .withMessage('Informe pelo um módulo do sistema!')
];

module.exports = {
    create,
    update
}
