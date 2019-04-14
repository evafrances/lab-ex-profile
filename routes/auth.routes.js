const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const secure = require('../middlewares/secure.mid');

router.get('/register', auth.register);
router.post('/register', auth.doRegister);
router.get('/login', auth.login);
router.post('/login', auth.doLogin);
router.get('/logout', auth.logout);
// secure.isAuthenticated es un middleware que valida si el usuario está autenticado
router.get('/profile', secure.isAuthenticated, auth.profile);
// TODO: google & profile paths

module.exports = router;
