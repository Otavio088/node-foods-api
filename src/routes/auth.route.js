const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const authValidators = require('../validators/auth.validator');
const authController = require('../controllers/auth.controller');

router.get('/user', authMiddleware, (req, res) => { res.json({ user: req.user }); });
router.post('/logout', authMiddleware, (req, res) => { res.clearCookie('token'); res.json({}); });
router.post('/login', authValidators.login, authController.login);

module.exports = router;
