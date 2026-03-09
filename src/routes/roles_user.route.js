const express = require('express');
const router = express.Router();

const rolesUserValidator = require('../validators/roles_user.validator');
const rolesUserController = require('../controllers/roles_user.controller');

router.get('/', rolesUserController.getAll);
router.post('/', rolesUserValidator.validationCreate, rolesUserController.create);

module.exports = router;