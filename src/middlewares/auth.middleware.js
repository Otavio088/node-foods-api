const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token)
            return res.status(401).send({ message: 'Usuário não autenticado!' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).send({
            message: 'Token inválido'
        });
    }
}

module.exports = authMiddleware;
