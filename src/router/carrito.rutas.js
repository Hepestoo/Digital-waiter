const express = require('express');
const router = express.Router()

const {mostrar, mandar, listar, traer, actualizar} = require('../controller/carrito.controller')

router.get('/agregar/:id', mostrar);
router.post('/agregar/:id',mandar)
router.get('/:id/listar',listar)
router.get('/:id/editar/:ida',traer)
router.post('/:id/editar/:ida',actualizar)

module.exports = router