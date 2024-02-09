const express = require('express');
const router = express.Router()

const {mostrar, lista, editar, añadir} = require('../controller/restauranteController')

router.get('/lista', mostrar)
router.get('/lista', lista)
router.get('/editar', editar)
router.get('/añadir', añadir)

module.exports = router