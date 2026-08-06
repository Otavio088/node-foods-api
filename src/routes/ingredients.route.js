const express = require('express');
const router = express.Router();

const ingredientsController = require('../controllers/ingredients.controller');
const ingredientsValidator = require('../validators/ingredients.validator');
const validatorMiddleware = require('../middlewares/validator.middleware');

router.get('/', ingredientsController.getAll);
router.get('/:id', ingredientsController.getById);
router.post('/', ingredientsValidator.create, validatorMiddleware, ingredientsController.create);
router.put('/:id', ingredientsValidator.update, validatorMiddleware, ingredientsController.update);
router.delete('/:id', ingredientsController.remove);

module.exports = router;
