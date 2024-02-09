const express = require('express');
const rutas = express.Router()

const { mostrar, mandar, lista, traer, actualizar } = require('../controller/tienda.controller')
const { isLoggedIn } = require('../lib/auth')

rutas.get('/agregar', mostrar)
rutas.post('/agregar',  mandar)
rutas.get('/lista', lista)
rutas.get('/editar/:id', traer)
rutas.post('/editar/:id', actualizar)
//rutas.get('/dashboard', isLoggedIn, showDashboard)

module.exports = rutas

