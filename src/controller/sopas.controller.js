const sopas = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

sopas.mostrar = (req, res) => {
    res.render('sopas/agregar');
}

//!FUNCIONAL
sopas.mandar = async(req, res) => {
    const id = req.idSopa
    const {nombre, descripcion, precio, estado } = req.body
    const nuevaSopa = {
        nombre,
        descripcion,
        precio,
        estado
    }
    await orm.sopas.create(nuevaSopa)
    req.flash('success', 'Creaco con exito')
    res.redirect('/sopas/listar/');
}

sopas.listar = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from sopas')
    res.render('sopas/listar', { lista })
}

sopas.traer = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from sopas where idSopa = ?', [ids])
    res.render('sopas/editar', { lista })
}

sopas.actualizar = async (req, res) => {
    const ids = req.params.id
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
    res.redirect('/sopas/listar/')
}

module.exports = sopas