const { body } = require('express-validator');

const create = [
    body('code')
        .trim()
        .notEmpty()
        .withMessage('Código da categoria de produtos é obrigatória!'),

    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nome da categoria de produtos é obrigatória!')
];

const update = [
    body('name')
        .trim()
        .optional()
        .notEmpty()
        .withMessage('Nome da categoria de produtos é obrigatória!')
];

module.exports = {
    create,
    update
}
