const express = require('express');
const router = express.Router();

const ingredientsValidator = require('../validators/ingredients.validator');
const ingredientsController = require('../controllers/ingredients.controller');

router.get('/', ingredientsController.getAll);
router.get('/:id', ingredientsController.getById);
router.post('/', ingredientsValidator.createAndUpdate, ingredientsController.create);
router.put('/:id', ingredientsValidator.createAndUpdate, ingredientsController.update);
router.delete('/:id', ingredientsController.remove);

module.exports = router;
