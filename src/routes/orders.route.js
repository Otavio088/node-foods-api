const express = require('express');
const router = express.Router();

const ordersController = require('../controllers/orders.controller');
const ordersValidator = require('../validators/orders.validator');
const validatorMiddleware = require('../middlewares/validator.middleware');

router.get('/', ordersController.getAll);
router.get('/:id', ordersController.getById);
router.post('/', ordersValidator.create, validatorMiddleware, ordersController.create);
router.put('/:id', ordersValidator.update, validatorMiddleware, ordersController.update);
router.delete('/:id', ordersController.remove);

module.exports = router;
