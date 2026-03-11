const express = require('express');
const router = express.Router();

const usersValidators = require('../validators/users.validator');
const usersController = require('../controllers/users.controller');

router.get('/', usersController.getAll)
router.post('/', usersValidators.create, usersController.create);

module.exports = router;