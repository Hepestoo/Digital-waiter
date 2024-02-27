const express = require('express');
const router = express.Router()

const {mostrar, mandar, listar, traer, actualizar} = require('../controller/entradas.controller')

//*FUNCIONAL

router.get('/agregar/:id',mostrar);
router.post('/agregar',mandar)
router.get('/listar/:id',listar)
router.get('/editar/:id',traer)
router.post('/editar/:id',actualizar)

module.exports = router