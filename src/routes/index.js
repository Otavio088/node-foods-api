const express = require('express');
const router = express.Router();

// Verificação de autenticação
const authMiddleware = require('../middlewares/auth.middleware');

// Importação dos arquivos de rota
const authRoute = require('./auth.route');
const modulesRoute = require('./modules.route');
const usersRoute = require('./users.route');
const rolesUserRoute = require('./roles_user.route');
const productsRoute = require('./products.route');

// Associação das url com os arquivos rota
router.use('/auth', authRoute);
router.use('/modules', authMiddleware, modulesRoute);
router.use('/users', authMiddleware, usersRoute);
router.use('/user/roles', authMiddleware, rolesUserRoute);
router.use('/products', authMiddleware, productsRoute);

module.exports = router;