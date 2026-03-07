const express = require('express');
const router = express.Router();

// Importação dos arquivos routers
const rolesUserRouter = require('./roles_user.route');

// Associa as rotas da url com os arquivos routers
router.use('/roles_user', rolesUserRouter);

module.exports = router;