const express = require('express');
const router = express.Router()

const {mostrar, mandar, listar, traer, actualizar} = require('../controller/entradas.controller')

//*FUNCIONAL

router.get('/agregar',mostrar);
router.post('/agregar',mandar)
router.get('/listar',listar)
router.get('/editar/:id',traer)
router.post('/editar/:id',actualizar)

module.exports = router