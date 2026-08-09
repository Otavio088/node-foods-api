const express = require('express');
const router = express.Router();

const ProductCategoriesController = require('../controllers/product_categories.controller');
const ProductCategoriesValidator = require('../validators/product_categories.validator');
const validatorMiddleware = require('../middlewares/validator.middleware');

router.get('/', ProductCategoriesController.getAll);
router.get('/:code', ProductCategoriesController.getOne);
router.post('/', ProductCategoriesValidator.create, validatorMiddleware, ProductCategoriesController.create);
router.put('/:code', ProductCategoriesValidator.update, validatorMiddleware, ProductCategoriesController.update);
router.delete('/:code', ProductCategoriesController.remove);

module.exports = router;
