const { body } = require('express-validator');

const login = [
    body('email')
        .notEmpty()
        .withMessage('E-mail é obrigatório!')
        .isEmail()
        .withMessage('E-mail inválido!'),

    body('password')
        .notEmpty()
        .withMessage('Senha é obrigatória!')
        .isLength({ min: 6 })
        .withMessage('A senha deve possuir pelo menos 6 caracteres!'),
];

module.exports = {
    login
}