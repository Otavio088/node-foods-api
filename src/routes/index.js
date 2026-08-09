const express = require('express');
const router = express.Router();

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware');

// Importação dos arquivos de rota
const authRoute = require('./auth.route');
const modulesRoute = require('./modules.route');
const rolesUserRoute = require('./roles_user.route');
const usersRoute = require('./users.route');
const unitTypesRoute = require('./unit_types.route');
const ingredientsRoute = require('./ingredients.route');
const ProductCategories = require('./product_categories.route');
const productsRoute = require('./products.route');

// Associação das url com os arquivos rota
router.use('/auth', authRoute);
router.use('/modules', authMiddleware, modulesRoute);
router.use('/roles', authMiddleware, rolesUserRoute);
router.use('/users', authMiddleware, usersRoute);
router.use('/unit_types', authMiddleware, unitTypesRoute);
router.use('/ingredients', authMiddleware, ingredientsRoute);
router.use('/products/categories', authMiddleware, ProductCategories);
router.use('/products', authMiddleware, productsRoute);

module.exports = router;