const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const usersValidator = require('../validators/users.validator');
const validatorMiddleware = require('../middlewares/validator.middleware');

router.get('/', usersController.getAll)
router.get('/:id', usersController.getById)
router.post('/', usersValidator.create, validatorMiddleware, usersController.create);
router.put('/:id', usersValidator.update, validatorMiddleware, usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;
