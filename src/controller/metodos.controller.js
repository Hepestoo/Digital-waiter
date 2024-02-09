const metodos ={}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

metodos.mostrar = (req, res) => {
    res.render('metodos/agregar');
}

metodos.mandar = async (req, res) => {
    const id = req.idMetodo
    const {metodoPago, estado} = req.body
    const nuevoMetodo = {
        metodoPago, 
        estado
    }
    await orm.metodo.create(nuevoMetodo)
    req.flash('success', 'Creaco con exito')
    res.redirect('/metodos/listar/');
}

metodos.traer = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from metodos where idMetodo = ?', [ids])
    res.render('metodos/editar', { lista })
}


metodos.listar = async(req, res) => {
    const ids = req.params.id
    const lista = await sql.query('select * from metodos')
    res.render('metodos/listar', { lista })
}

metodos.actualizar = async (req, res) => {
    const ids = req.params.id
    const {metodoPago, estado} = req.body
    const actualizarMetodo = {
        metodoPago, 
        estado
    }
    await orm.metodo.findOne({where: { idMetodo: ids}})
        .then(actualizar => {
            actualizar.update(actualizarMetodo)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect('/metodos/listar/')
}

module.exports = metodos