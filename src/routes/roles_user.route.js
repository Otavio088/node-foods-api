const express = require('express');
const router = express.Router();

const rolesUserController = require('../controllers/roles_user.controller');

router.get('/', rolesUserController.getAll);

module.exports = router;