const express = require('express');
const router = express.Router();

const rolesUserController = require('../controllers/roles_user.controller');
const rolesUserValidator = require('../validators/roles_user.validator');
const validatorMiddleware = require('../middlewares/validator.middleware');

router.get('/', rolesUserController.getAll);
router.get('/:id', rolesUserController.getById);
router.post('/', rolesUserValidator.create, validatorMiddleware, rolesUserController.create);
router.put('/:id', rolesUserValidator.update, validatorMiddleware, rolesUserController.update);
router.delete('/:id', rolesUserController.remove);

module.exports = router;
