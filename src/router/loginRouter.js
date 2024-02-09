const express = require('express');
const router = express.Router();

const { show, showRegister, sendRegistro, sendLogin } = require ("../controller/loginController")

router.get('/login', show)
router.post('/login', sendLogin)
router.get('/registro', showRegister)
router.post('/registro', sendRegistro)

module.exports = router