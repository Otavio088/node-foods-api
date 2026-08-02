const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller');
const productsValidator = require('../validators/products.validator');
const validatorMiddleware = require('../middlewares/validator.middleware');

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsValidator.create, validatorMiddleware, productsController.create);
router.put('/:id', productsValidator.update, validatorMiddleware, productsController.update);
router.delete('/:id', productsController.remove);

module.exports = router;
