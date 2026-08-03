const { body } = require('express-validator');

const create = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nome da unidade de medida é obrigatório!'),

    body('type')
        .trim()
        .notEmpty()
        .withMessage('Tipo de unidade de medida é obrigatório!'),
];

const update = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Nome da unidade de medida é obrigatório!'),

    body('type')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Tipo de unidade de medida é obrigatório!'),
];

module.exports = {
    create,
    update
}
