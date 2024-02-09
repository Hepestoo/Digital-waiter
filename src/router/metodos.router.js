const express = require('express');
const router = express.Router()

const {mostrar, listar, mandar, traer, actualizar, traer1 } = require('../controller/metodos.controller')

router.get('/agregar',mostrar);
//router.get('/agregar',traer1);
router.post('/agregar',mandar);
router.get('/listar',listar)
router.get('/editar/:id',traer)
router.post('/editar/:id',actualizar)

module.exports = router