const carrito ={}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

carrito.mostrar = (req, res) => {
    res.render('carrito/agregar');
}

carrito.mandar = async (req, res) => {
    const id = req.idCarro
    const {nombre, limite, estado} = req.body
    const nuevoCarrito = {
        nombre,
        limite, 
        estado
    }
    await orm.carro.create(nuevoCarrito)
    req.flash('success', 'Creaco con exito')
    res.redirect('/carrito/listar/');
}

carrito.listar = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from carros')
    res.render('carrito/listar', { lista })
}

carrito.traer = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from carros where idCarro = ?', [ids])
    res.render('carrito/editar', { lista })
}

carrito.actualizar = async (req, res) => {
    const ids = req.params.id
    const {nombre, limite, estado} = req.body
    const nuevoCarrito = {
        nombre,
        limite, 
        estado
    }
    await orm.carro.findOne({where: { idCarro: ids}})
        .then(actualizar => {
            actualizar.update(nuevoCarrito)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/carrito/listar/')
}
module.exports = carrito