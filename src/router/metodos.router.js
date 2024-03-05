const express = require('express');
const router = express.Router()

const {mostrar, listar, mandar, traer, actualizar, traer1 } = require('../controller/metodos.controller')

router.get('/agregar/:id',mostrar);
//router.get('/agregar',traer1);
router.post('/agregar',mandar);
router.get('/listar/:id',listar)
router.get('/:ida/editar/:id',traer)
router.post('/:ida/editar/:id',actualizar)

module.exports = router