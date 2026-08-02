const { body } = require('express-validator');
const HttpError = require('../classes/HttpError');

const create = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Nome de usuário é obrigatório!'),

    body('email')
        .notEmpty()
        .withMessage('E-mail de usuário é obrigatório!')
        .isEmail()
        .withMessage('E-mail inválido.'),

    body('password')
        .notEmpty()
        .withMessage('Senha do usuário é obrigatória!')
        .isLength({ min: 6 })
        .withMessage('A senha deve possuir pelo menos 6 caracteres.'),

    body('password_confirm')
        .notEmpty()
        .withMessage('Confirmação de senha do usuário é obrigatória!')
        .isLength({ min: 6 })
        .withMessage('A confirmação de senha deve possuir pelo menos 6 caracteres.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new HttpError('Senha e Confirmação de Senha devem ser iguais!', 400);
            }
            return true;
        }),

    body('roles_ids')
        .notEmpty()
        .withMessage('As permissões de usuário são obrigatórias!')
        .isArray()
        .withMessage('As permissões de usuário deve ser um array!')
        .isArray({min: 1})
        .withMessage('Informe pelo uma permissão de usuário'),

    body('active')
        .optional()
        .isBoolean()
        .withMessage('O active deve ser booleano (true ou false)'),
];

const update = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Nome de usuário não pode ser vazio!'),

    body('email')
        .optional()
        .notEmpty()
        .withMessage('E-mail de usuário não pode ser vazio!')
        .isEmail()
        .withMessage('E-mail inválido.'),

    body('password')
        .optional()
        .notEmpty()
        .withMessage('Senha do usuário não pode ser vazia!')
        .isLength({ min: 6 })
        .withMessage('A senha deve possuir pelo menos 6 caracteres.')
        .custom((value, { req }) => {
            if (value !== req.body.password_confirm) {
                throw new HttpError('Senha e Confirmação de Senha devem ser iguais!', 400);
            }
            return true;
        }),

    body('password_confirm')
        .optional()
        .notEmpty()
        .withMessage('Confirmação de senha do usuário não pode ser vazia!')
        .isLength({ min: 6 })
        .withMessage('A confirmação de senha deve possuir pelo menos 6 caracteres.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new HttpError('Senha e Confirmação de Senha devem ser iguais!', 400);
            }
            return true;
        }),

    body('roles_ids')
        .optional()
        .notEmpty()
        .withMessage('As permissões de usuário não podem ser vazias!')
        .isArray()
        .withMessage('As permissões de usuário deve ser um array!')
        .isArray({min: 1})
        .withMessage('Informe pelo menos 1 ID de permissão de usuário'),

    body('active')
        .optional()
        .isBoolean()
        .withMessage('O active deve ser booleano (true ou false)'),
];

module.exports = {
    create,
    update
}