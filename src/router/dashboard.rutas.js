const express = require('express');
const rutas = express.Router()

const { showDashboard, showForm, showMetodos, showCarrito, showMenu, listar } = require('../controller/dashboard.controller');

// Definición de las rutas
rutas.get('/dashboard/:id', showDashboard);
rutas.get('/crearMenu/:id', showForm);
rutas.get('/metodos/:id', showMetodos);
rutas.get('/visualizar', (req, res) => res.redirect('/visualizar/activos')); // Redireccionamiento a visualizar/activos
rutas.get('/visualizar/:id', listar);
rutas.get('/carrito/:id', showCarrito);

module.exports = rutas