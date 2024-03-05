const postres = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

postres.mostrar = (req, res) => {
    const idRestaurante = req.params.id
    res.render('postres/agregar',{idRestaurante});
}
//!FUNCIONAL
postres.mandar = async (req, res) => {
    const id = req.params.id    
    const {nombre, descripcion, precio, estado} = req.body
  
    await sql.query('INSERT INTO postres(nombre,descripcion, precio, estado,restauranteIdRestaurante) VALUES (?,?,?,?,?)', [nombre, descripcion, precio, estado,id])
    
    req.flash('success', 'Creaco con exito')
    res.redirect(`/postres/listar/${id}`);
}

postres.traer = async(req, res) => {
    const idRestaurante = req.params.ida
    const id = req.params.id

    const lista = await sql.query('select * from postres where idPostres = ?', [id])
    res.render('postres/editar', { lista , idRestaurante })
}

postres.listar = async(req, res) => {
    const idRestaurante = req.params.id
    const listaPostre = await sql.query('select * from restaurantes where idRestaurante =?', [idRestaurante])
    const lista = await sql.query('select * from postres where restauranteIdRestaurante =?',[idRestaurante])
    res.render('postres/listar', { lista, listaPostre , idRestaurante })
}

postres.actualizar = async (req, res) => {
    const idRestaurante = req.params.ida
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
    res.redirect(`/postres/listar/${idRestaurante}`)
}

module.exports = postres