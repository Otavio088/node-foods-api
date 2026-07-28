const HttpError = require('../classes/HttpError');
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new HttpError({
            errors: errors.array().map(err => ({
                message: err.msg,
                field: err.path,
                location: err.location
            }))
        }, 400);
    }

    next();
}
