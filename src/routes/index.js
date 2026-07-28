const express = require('express');
const router = express.Router();

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const errorMiddleware = require('../middlewares/error.middleware');

// Importação dos arquivos de rota
const authRoute = require('./auth.route');
const modulesRoute = require('./modules.route');
const usersRoute = require('./users.route');
const rolesUserRoute = require('./roles_user.route');
const productsRoute = require('./products.route');
const unitTypesRoute = require('./unit_types.route');
const ingredientsRoute = require('./ingredients.route');

// Associação das url com os arquivos rota
router.use('/auth', authRoute);
router.use('/modules', authMiddleware, modulesRoute);
router.use('/users', authMiddleware, usersRoute);
router.use('/user/roles', authMiddleware, rolesUserRoute);
router.use('/products', authMiddleware, productsRoute);
router.use('/unit_types', authMiddleware, unitTypesRoute);
router.use('/ingredients', authMiddleware, ingredientsRoute);

module.exports = router;