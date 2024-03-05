const entradas = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

entradas.mostrar = (req, res) => {
    const idRestaurante= req.params.id
    res.render('entradas/agregar', {idRestaurante});
}
//!FUNCIONAL
entradas.mandar = async (req, res) => {
    const id = req.params.id
    const {nombre, descripcion, precio, estado} = req.body


    await sql.query('INSERT INTO entradas(nombre,descripcion, precio, estado,restauranteIdRestaurante) VALUES (?,?,?,?,?)', [nombre, descripcion, precio, estado,id])
    //await orm.entrada.create(nuevaEntrada)
    req.flash('success', 'Creado con exito')
    res.redirect(`/entradas/listar/${id}`);
}

entradas.listar = async(req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.id
    const listaEntrada = await sql.query('select * from restaurantes where idRestaurante =?', [ids])
    const lista = await sql.query('select * from entradas where restauranteIdRestaurante =?',[ids])
    res.render('entradas/listar', { lista, listaEntrada ,idRestaurante })
    
}

entradas.traer = async(req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.ida
    const lista = await sql.query('select * from entradas where idEntrada = ?', [ids])
    res.render('entradas/editar', { lista ,idRestaurante})
}

entradas.actualizar = async (req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.ida
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
    res.redirect(`/entradas/listar/${idRestaurante}`)
}

module.exports = entradas