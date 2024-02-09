const postres = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

postres.mostrar = (req, res) => {
    res.render('postres/agregar');
}
//!FUNCIONAL
postres.mandar = async (req, res) => {
    const id = req.idPostres
    const {nombre, descripcion, precio, estado} = req.body
    const nuevaEntrada = {
        nombre,
        descripcion,
        precio, 
        estado
    }
    await orm.postres.create(nuevaEntrada)
    req.flash('success', 'Creaco con exito')
    res.redirect('/postres/listar/');
}

postres.traer = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from postres where idPostres = ?', [ids])
    res.render('postres/editar', { lista })
}

postres.listar = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from postres')
    res.render('postres/listar', { lista })
}

postres.actualizar = async (req, res) => {
    const ids = req.params.id
    const {nombre, descripcion, precio, estado} = req.body
    const actualizarEntrada = {
        nombre,
        descripcion,
        precio,
        estado
    }
    await orm.postres.findOne({where: { idPostres: ids}})
        .then(actualizar => {
            actualizar.update(actualizarEntrada)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/postres/listar/')
}

module.exports = postres