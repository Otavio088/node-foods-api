const express = require('express');
const router = express.Router();

const rolesUserValidator = require('../validators/roles_user.validator');
const rolesUserController = require('../controllers/roles_user.controller');

router.get('/', rolesUserController.getAll);
router.get('/:id', rolesUserController.getById);
router.post('/', rolesUserValidator.create, rolesUserController.create);
router.put('/:id', rolesUserValidator.update, rolesUserController.update);
router.delete('/:id', rolesUserController.remove);

module.exports = router;
