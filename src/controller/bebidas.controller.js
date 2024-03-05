const bebidas = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

bebidas.mostrar = (req, res) => {
    const idRestaurante = req.params.id
    res.render('bebidas/agregar',{idRestaurante});
}
//!FUNCIONAL
bebidas.mandar = async (req, res) => {
    const id = req.params.id
    const {nombre,  precio, estado} = req.body
  
    await sql.query('INSERT INTO bebidas(nombre, precio, estado,restauranteIdRestaurante) VALUES (?,?,?,?)', [nombre,  precio, estado,id])

    req.flash('success', 'Creado con exito')
    res.redirect(`/bebidas/listar/${id}`);
}

bebidas.listar = async(req, res) => {
    const idRestaurante = req.params.id
    const listaBebida = await sql.query('select * from restaurantes where idRestaurante =?', [idRestaurante])
    const lista = await sql.query('select * from bebidas where restauranteIdRestaurante =?',[idRestaurante])
    res.render('bebidas/listar', { lista, listaBebida , idRestaurante})
}

bebidas.traer = async(req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.ida

    const lista = await sql.query('select * from bebidas where idBebidas = ?', [ids])
    res.render('bebidas/editar', { lista,idRestaurante })
}

bebidas.actualizar = async (req, res) => {
    const ids = req.params.id
    const idRestaurante = req.params.ida

    const {nombre, precio, estado} = req.body
    const actualizarEntrada = {
        nombre,
        precio,
        estado
    }
    await orm.bebida.findOne({where: { idBebidas: ids}})
        .then(actualizar => {
            actualizar.update(actualizarEntrada)
        })
    req.flash('success', 'Actualizado exitosamente')
    res.redirect(`/bebidas/listar/${idRestaurante}`)
}

module.exports = bebidas