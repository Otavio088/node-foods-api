const express = require('express');
const router = express.Router();

const unitTypesController = require('../controllers/unit_type.controller');
const unitTypesValidator = require('../validators/unit_types.validator');
const validatorMiddleware = require('../middlewares/validator.middleware');

router.get('/', unitTypesController.getAll);
router.get('/:id', unitTypesController.getById);
router.post('/', unitTypesValidator.create, validatorMiddleware, unitTypesController.create);
router.put('/:id', unitTypesValidator.update, validatorMiddleware, unitTypesController.update);
router.delete('/:id', unitTypesController.remove);

module.exports = router;
