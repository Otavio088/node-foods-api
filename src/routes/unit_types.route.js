const express = require('express');
const router = express.Router();

const unitTypesValidator = require('../validators/unit_types.validator');
const unitTypesController = require('../controllers/unit_type.controller');

router.get('/', unitTypesController.getAll);
router.get('/:id', unitTypesController.getById);
router.post('/', unitTypesValidator.create, unitTypesController.create);
router.put('/:id', unitTypesValidator.update, unitTypesController.update);
router.delete('/:id', unitTypesController.remove);

module.exports = router;
