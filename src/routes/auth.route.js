const express = require('express');
const router = express.Router();

const authValidators = require('../validators/auth.validator');
const authController = require('../controllers/auth.controller');

router.post('/login', authValidators.login, authController.login);

module.exports = router;
