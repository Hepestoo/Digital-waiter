const express = require('express');
const rutas = express.Router()

const { showDashboard, showForm, showMetodos, showCarrito, showMenu, listar } = require('../controller/dashboard.controller');

// Definición de las rutas
rutas.get('/dashboard', showDashboard);
rutas.get('/crearMenu', showForm);
rutas.get('/metodos', showMetodos);
rutas.get('/visualizar', (req, res) => res.redirect('/visualizar/activos')); // Redireccionamiento a visualizar/activos
rutas.get('/visualizar/:id', listar);
rutas.get('/carrito', showCarrito);

module.exports = rutas