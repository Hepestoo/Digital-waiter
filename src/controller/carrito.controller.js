const carrito ={}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

carrito.mostrar = (req, res) => {
    const idRestaurante= req.params.id
    res.render('carrito/agregar', {idRestaurante});
}

carrito.mandar = async (req, res) => {
    const id = req.params.id
    const {nombre, limite, estado} = req.body
    const nuevoCarrito = {
        nombre,
        limite, 
        estado
    }
    await sql.query('INSERT INTO carros (nombre, limite, estado, restauranteIdRestaurante) VALUES (?,?,?,?)', [nombre, limite, estado, id])
    req.flash('success', 'Creado con exito')
    res.redirect(`/carrito/${id}/listar`);
}

carrito.listar = async(req, res) => {
    const idRestaurante = req.params.id
    const listaCarrito = await sql.query('select * from carros where restauranteIdRestaurante =?', [idRestaurante])
    console.log(idRestaurante)
    res.render('carrito/listar', { listaCarrito, idRestaurante })
}

carrito.traer = async(req, res) => {
    const id = req.params.id
    const idRestaurante = req.params.id
    const ida = req.params.ida
    const lista = await sql.query('select * from carros where idCarro = ?', [ida])
    res.render('carrito/editar', { lista, idRestaurante, id })
}

carrito.actualizar = async (req, res) => {
    const id = req.params.id
    const ida = req.params.ida
    const {nombre, limite, estado} = req.body
    const nuevoCarrito = {
        nombre,
        limite, 
        estado
    }
    await orm.carro.findOne({where: { idCarro: ida}})
        .then(actualizar => {
            actualizar.update(nuevoCarrito)
        })
    req.flash('success', 'Actualizado exitosamente')
    const previousPage = req.headers.referer
    res.redirect('../listar');
}
module.exports = carrito