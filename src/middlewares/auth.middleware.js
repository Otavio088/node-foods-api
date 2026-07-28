const jwt = require('jsonwebtoken');
const HttpError = require('../classes/HttpError');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token)
            throw new HttpError('Usuário não autenticado!', 401);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        next(new HttpError('Token inválido!', 401));
    }
}
