const { body } = require('express-validator');

const create = [
    body('user_id')
        .notEmpty()
        .withMessage('ID de usuário é obrigatório!')
        .isInt()
        .withMessage('ID de usuário deve ser inteiro!'),

    body('type')
        .trim()
        .notEmpty()
        .withMessage('Tipo de Pedido é obrigatório!')
        .isIn(['dine_in', 'pickup', 'delivery'])
        .withMessage('O tipo do pedido deve ser delivery, dine_in ou pickup.'),

    body('table_number')
        .if((value, { req }) => req.body.type === 'dine_in')
        .notEmpty()
        .withMessage('O número da mesa é obrigatório!')
        .isInt()
        .withMessage('O número da mesa deve ser um número inteiro.'),

    body('city')
        .if((value, { req }) => req.body.type === 'delivery')
        .trim()
        .notEmpty()
        .withMessage('A cidade é obrigatória!'),

    body('street')
        .if((value, { req }) => req.body.type === 'delivery')
        .trim()
        .notEmpty()
        .withMessage('A rua é obrigatória!'),

    body('neighborhood')
        .if((value, { req }) => req.body.type === 'delivery')
        .trim()
        .notEmpty()
        .withMessage('O bairro é obrigatório!'),

    body('house_number')
        .if((value, { req }) => req.body.type === 'delivery')
        .trim()
        .notEmpty() 
        .withMessage('O número da casa é obrigatório!'),

    body('buyer_name')
        .trim()
        .notEmpty() 
        .withMessage('O nome do comprador é obrigatório!'),

    body('obs')
        .optional()
        .trim()
        .notEmpty() 
        .withMessage('A observação está vazia!'),

    body('items')
        .notEmpty()
        .withMessage('Itens do pedido são obrigatórios!')
        .isArray()
        .withMessage('Os itens do pedido deve ser um array de objetos!')
        .isArray({min: 1})
        .withMessage('Informe pelo menos um item do pedido!'),

    body('items.*.product_id')
        .notEmpty()
        .withMessage('Produto é obrigatório!')
        .isInt()
        .withMessage('ID do produto deve ser inteiro!'),

    body('items.*.quantity')
        .notEmpty()
        .withMessage('Quantidade de produto é obrigatório!')
        .isInt()
        .withMessage('Quantidade do produto deve ser inteiro!'),

    body('items.*.extra_addition')
        .optional()
        .isArray()
        .withMessage('A adição extra deve ser um array de objetos!')
        .isArray({min: 1})
        .withMessage('Informe pelo menos uma adição extra!'),

    body('items.*.extra_addition.*.name')
        .notEmpty() 
        .withMessage('O nome da adição extra é obrigatório!'),

    body('items.*.extra_addition.*.value')
        .notEmpty() 
        .withMessage('O valor da adição extra é obrigatório!')
        .isFloat()
        .withMessage('O valor da adição extra deve ser número real!'),

    body('items.*.extra_addition.*.quantity')
        .notEmpty() 
        .withMessage('A quantidade da adição extra é obrigatório!')
        .isInt()
        .withMessage('A quantidade da adição extra deve ser inteiro!'),
];

const update = [
    body('user_id')
        .notEmpty()
        .withMessage('ID de usuário é obrigatório!')
        .isInt()
        .withMessage('ID de usuário deve ser inteiro!'),

    body('type')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Tipo de Pedido é obrigatório!')
        .isIn(['dine_in', 'pickup', 'delivery'])
        .withMessage('O tipo do pedido deve ser delivery, dine_in ou pickup.'),

    body('table_number')
        .optional()
        .if((value, { req }) => req.body.type === 'dine_in')
        .notEmpty()
        .withMessage('O número da mesa é obrigatório!')
        .isInt()
        .withMessage('O número da mesa deve ser um número inteiro.'),

    body('city')
        .optional()
        .if((value, { req }) => req.body.type === 'delivery')
        .trim()
        .notEmpty()
        .withMessage('A cidade é obrigatória!'),

    body('street')
        .optional()
        .if((value, { req }) => req.body.type === 'delivery')
        .trim()
        .notEmpty()
        .withMessage('A rua é obrigatória!'),

    body('neighborhood')
        .optional()
        .if((value, { req }) => req.body.type === 'delivery')
        .trim()
        .notEmpty()
        .withMessage('O bairro é obrigatório!'),

    body('house_number')
        .optional()
        .if((value, { req }) => req.body.type === 'delivery')
        .trim()
        .notEmpty() 
        .withMessage('O número da casa é obrigatório!'),

    body('buyer_name')
        .optional()
        .trim()
        .notEmpty() 
        .withMessage('O nome do comprador é obrigatório!'),

    body('obs')
        .optional()
        .trim()
        .notEmpty() 
        .withMessage('A observação está vazia!'),

    body('items')
        .optional()
        .notEmpty()
        .withMessage('Itens do pedido são obrigatórios!')
        .isArray()
        .withMessage('Os itens do pedido deve ser um array de objetos!')
        .isArray({min: 1})
        .withMessage('Informe pelo menos um item do pedido!'),

    body('items.*.product_id')
        .optional()
        .notEmpty()
        .withMessage('Produto é obrigatório!')
        .isInt()
        .withMessage('ID do produto deve ser inteiro!'),

    body('items.*.quantity')
        .optional()
        .notEmpty()
        .withMessage('Quantidade de produto é obrigatório!')
        .isInt()
        .withMessage('Quantidade do produto deve ser inteiro!'),

    body('items.*.extra_addition')
        .optional()
        .isArray()
        .withMessage('A adição extra deve ser um array de objetos!')
        .isArray({min: 1})
        .withMessage('Informe pelo menos uma adição extra!'),

    body('items.*.extra_addition.*.name')
        .optional()
        .notEmpty() 
        .withMessage('O nome da adição extra é obrigatório!'),

    body('items.*.extra_addition.*.value')
        .optional()
        .notEmpty() 
        .withMessage('O valor da adição extra é obrigatório!')
        .isFloat()
        .withMessage('O valor da adição extra deve ser número real!'),

    body('items.*.extra_addition.*.quantity')
        .optional()
        .notEmpty() 
        .withMessage('A quantidade da adição extra é obrigatório!')
        .isInt()
        .withMessage('A quantidade da adição extra deve ser inteiro!'),
];

module.exports = {
    create,
    update
}
