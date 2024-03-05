const express = require("express");
const rutas = express.Router()

const { mostrar, Mostrar} = require('../controller/principal.controller')
const { lista } = require('../controller/tienda.controller')
rutas.get('/principal', lista)
rutas.get('/agregar', Mostrar)

module.exports = rutas
