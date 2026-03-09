const express = require('express');
const router = express.Router();

// Importação dos arquivos de rota
const usersRoute = require('./users.route');
const rolesUserRoute = require('./roles_user.route');

// Associação das url com os arquivos rota
// router.use('/users', usersRoute);
router.use('/user/roles', rolesUserRoute);

module.exports = router;