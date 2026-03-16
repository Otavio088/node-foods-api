const express = require('express');
const router = express.Router();

const usersValidator = require('../validators/users.validator');
const usersController = require('../controllers/users.controller');

router.get('/', usersController.getAll)
router.get('/:id', usersController.getById)
router.post('/', usersValidator.create, usersController.create);
router.put('/:id', usersValidator.update, usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;
