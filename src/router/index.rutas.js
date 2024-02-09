const express = require('express');
const rutas = express.Router();

const {show} = require ("../controller/index.controller")

rutas.get("/", show)


module.exports = rutas