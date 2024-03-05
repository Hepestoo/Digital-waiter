const express = require('express');
const router = express.Router()

const {mostrar, mandar, listar, traer, actualizar} = require('../controller/entradas.controller')

//*FUNCIONAL

router.get('/agregar/:id',mostrar);
router.post('/agregar/:id',mandar)
router.get('/listar/:id',listar)
router.get('/:ida/editar/:id',traer)
router.post('/:ida/editar/:id',actualizar)

module.exports = router