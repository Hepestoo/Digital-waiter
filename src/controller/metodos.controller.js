const metodos ={}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

metodos.mostrar = (req, res) => {
    const idRestaurante = req.params.id
    res.render('metodos/agregar',{idRestaurante});
}

metodos.mandar = async (req, res) => {
    const {metodoPago, estado} = req.body
    const nuevoMetodo = {
        metodoPago, 
        estado
    }
    await orm.metodo.create(nuevoMetodo)
    req.flash('success', 'Creado con exito')
    res.redirect('/metodos/listar/4');
}

metodos.traer = async(req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.ida
    const lista = await sql.query('select * from metodos WHERE idMetodo = ?', [ids])
    res.render('metodos/editar', { lista ,idRestaurante })
}


metodos.listar = async(req, res) => {
    const ids = req.params.id;
    const idRestaurante = req.params.id
    const listaRestaurante = await sql.query('select * from restaurantes where idRestaurante = ?', [ids])
    const lista = await sql.query('select * from metodos')
    res.render('metodos/listar', { lista,listaRestaurante,idRestaurante })
}

metodos.actualizar = async (req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.ida
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
    res.redirect(`/metodos/listar/${ids}`)
    
}

module.exports = metodos