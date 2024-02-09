const tiendaCTl = {}

const { Path } = require('path');

const orm = require('../Database/dataBase.orm')
const sql = require('../Database/dataBase.sql')

tiendaCTl.mostrar = (req, res) => {
    res.render('tienda/agregar');
}

//!FUNCIONAL
tiendaCTl.mandar = async (req, res) => {
    const id = req.user.idRestaurant
    const { idRestaurant, restaurantName, location, imageRestaurant, tipoComida } = req.body
    const newSend = {
        restaurantName,
        location,
        imageRestaurant,
        tipoComida,
    }
    await orm.restaurantes.create(newSend)
    
    res.redirect('/tienda/lista/');
}

tiendaCTl.lista = async (req, res) => {
    const lista = await sql.query('select * from restaurantes')
    res.render('tienda/lista', { lista })
}

tiendaCTl.traer = async (req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from restaurantes where idRestaurante = ?', [ids])
    res.render('tienda/editar', {lista})
}

tiendaCTl.actualizar = async (req, res) => {
    const id = req.user.idRestaurant
    const ids = req.params.id
    const { idRestaurante, restaurantName, location, imageRestaurant, tipoComida } = req.body
    const newSend = {
        restaurantName,
        location,
        imageRestaurant,
        tipoComida,
        // gerenteIdGerente: id
    }
    await orm.restaurantes.findOne({ where: {idRestaurante: ids } })
        .then(actualizar => {
            actualizar.update(newSend)
            req.flash('success', 'Actualizado con extio')
        })
        res.redirect('/tienda/lista/' );
}

module.exports = tiendaCTl;