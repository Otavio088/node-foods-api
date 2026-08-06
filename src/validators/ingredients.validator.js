const { body } = require('express-validator');

const create = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nome do ingrediente é obrigatório!'),

    body('unit_type_id')
        .notEmpty()
        .withMessage('Unidade de medida é obrigatória!')
        .isInt()
        .withMessage('Unidade de medida deve ser inteiro')
];

const update = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Nome do ingrediente é obrigatório!'),

    body('unit_type_id')
        .optional()
        .notEmpty()
        .withMessage('Unidade de medida é obrigatória!')
        .isInt()
];

module.exports = {
    create,
    update
}
