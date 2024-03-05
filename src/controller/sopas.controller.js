const sopas = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

sopas.mostrar = (req, res) => {
    const idRestaurante = req.params.id
    res.render('sopas/agregar', {idRestaurante});
}

//!FUNCIONAL
sopas.mandar = async(req, res) => {
    const id = req.params.id
    const {nombre, descripcion, precio, estado } = req.body
    
    await sql.query('INSERT INTO sopas(nombre,descripcion, precio, estado,restauranteIdRestaurante) VALUES (?,?,?,?,?)', [nombre, descripcion, precio, estado,id])
    // await orm.sopas.create(nuevaSopa)
    req.flash('success', 'Creado con exito')
    res.redirect(`/sopas/listar/${id}`);
}

sopas.listar = async(req, res) => {
    const idRestaurante = req.params.id
    const listaSopa = await sql.query('select * from restaurantes where idRestaurante =?', [idRestaurante])
    const lista = await sql.query('select * from sopas where restauranteIdRestaurante =?',[idRestaurante])
    res.render('sopas/listar', { lista, listaSopa, idRestaurante })
}

sopas.traer = async(req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.ida
    const lista = await sql.query('select * from sopas where idSopa = ?', [ids])
    res.render('sopas/editar', { lista,idRestaurante })
}

sopas.actualizar = async (req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.ida
    const {nombre, descripcion, precio, estado} = req.body
    const actualizarEntrada = {
        nombre,
        descripcion,
        precio,
        estado
    }
    await orm.sopas.findOne({where: { idSopa: ids}})
        .then(actualizar => {
            actualizar.update(actualizarEntrada)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect(`/sopas/listar/${idRestaurante}`)
}

module.exports = sopas