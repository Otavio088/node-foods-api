const { body } = require('express-validator');

const create = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nome do produto é obrigatório!'),

    body('price')
        .notEmpty()
        .withMessage('Preço do produto é obrigatório!')
        .isFloat()
        .withMessage('Preço do produto deve ser número real!'),

    body('user_id')
        .notEmpty()
        .withMessage('ID de usuário é obrigatório!')
        .isInt()
        .withMessage('ID de usuário deve ser inteiro!'),

    body('ingredients')
        .optional()
        .isArray()
        .withMessage('Os ingredientes deve ser um array de objetos!')
        .isArray({min: 1})
        .withMessage('Informe pelo um igrediente!')

];

const update = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Nome do produto é obrigatório!'),

    body('price')
        .optional()
        .notEmpty()
        .withMessage('Preço do produto é obrigatório!')
        .isFloat()
        .withMessage('Preço do produto deve ser número real!'),

    body('user_id')
        .notEmpty()
        .withMessage('ID de usuário é obrigatório!')
        .isInt()
        .withMessage('ID de usuário deve ser inteiro!'),

    body('ingredients')
        .optional()
        .isArray()
        .withMessage('Os ingredientes deve ser um array de objetos!')
        .isArray({min: 1})
        .withMessage('Informe pelo um igrediente!')

];

module.exports = {
    create,
    update
}
