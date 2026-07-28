// Classe utilizada para tratativa de erros com statusCode

class HttpError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = HttpError;
