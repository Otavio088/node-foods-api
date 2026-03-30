const express = require('express');
const router = express.Router();

const productsValidator = require('../validators/products.validator');
const productsController = require('../controllers/products.controller');

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsValidator.create, productsController.create);
router.put('/:id', productsValidator.update, productsController.update);
router.delete('/:id', productsController.remove);

module.exports = router;
