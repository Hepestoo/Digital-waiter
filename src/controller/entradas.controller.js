const entradas = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

entradas.mostrar = (req, res) => {
    res.render('entradas/agregar');
}
//!FUNCIONAL
entradas.mandar = async (req, res) => {
    const id = req.idEntrada
    const {nombre, descripcion, precio, estado} = req.body
    const nuevaEntrada = {
        nombre,
        descripcion,
        precio, 
        estado
    }
    await orm.entrada.create(nuevaEntrada)
    req.flash('success', 'Creaco con exito')
    res.redirect('/entradas/listar/');
}

entradas.listar = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from entradas ', [ids])
    res.render('entradas/listar', { lista })
}

entradas.traer = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from entradas where idEntrada = ?', [ids])
    res.render('entradas/editar', { lista })
}

entradas.actualizar = async (req, res) => {
    const ids = req.params.id
    const {nombre, descripcion, precio, estado} = req.body
    const actualizarEntrada = {
        nombre,
        descripcion,
        precio,
        estado
    }
    await orm.entrada.findOne({where: { idEntrada: ids}})
        .then(actualizar => {
            actualizar.update(actualizarEntrada)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/entradas/listar/')
}

module.exports = entradas