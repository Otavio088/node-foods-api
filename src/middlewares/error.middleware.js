module.exports = (err, req, res, next) => {
    return res.status(err.statusCode || 500).json(
        typeof err.message === 'object'
            ? err.message
            : { message: err.message || 'Erro interno do servidor!' }
    );
}