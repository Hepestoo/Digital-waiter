const bebidas = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

bebidas.mostrar = (req, res) => {
    res.render('bebidas/agregar');
}
//!FUNCIONAL
bebidas.mandar = async (req, res) => {
    const id = req.idBebidas
    const {nombre, descripcion, precio, estado} = req.body
    const nuevaEntrada = {
        nombre,
        descripcion,
        precio, 
        estado
    }
    await orm.bebida.create(nuevaEntrada)
    req.flash('success', 'Creaco con exito')
    res.redirect('/bebidas/listar/');
}

bebidas.listar = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from bebidas')
    res.render('bebidas/listar', { lista })
}

bebidas.traer = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from bebidas where idBebidas = ?', [ids])
    res.render('bebidas/editar', { lista })
}

bebidas.actualizar = async (req, res) => {
    const ids = req.params.id
    const {nombre, descripcion, precio, estado} = req.body
    const actualizarEntrada = {
        nombre,
        descripcion,
        precio,
        estado
    }
    await orm.bebida.findOne({where: { idBebidas: ids}})
        .then(actualizar => {
            actualizar.update(actualizarEntrada)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/bebidas/listar/')
}

module.exports = bebidas