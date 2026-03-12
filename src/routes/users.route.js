const express = require('express');
const router = express.Router();

const usersValidators = require('../validators/users.validator');
const usersController = require('../controllers/users.controller');

router.get('/', usersController.getAll)
router.get('/:id', usersController.getById)
router.get('/login/:password/:email', usersController.getByLogin);
router.post('/', usersValidators.create, usersController.create);
router.put('/:id', usersValidators.update, usersController.update);
router.delete('/:id', usersController.remove);

module.exports = router;