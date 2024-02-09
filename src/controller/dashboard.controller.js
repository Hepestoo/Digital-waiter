const dashboard = {}

const sql = require('../Database/dataBase.sql')
const orm = require('../Database/dataBase.orm')

dashboard.showDashboard = (req, res) => {
    res.render('dashboard/dashboard')
}

dashboard.showForm = (req, res) => {
    res.render('dashboard/crearMenu')
}
dashboard.showMetodos = (req, res) => {
    res.render('dashboard/metodos')
}
dashboard.showCarrito = (req, res) => {
    res.render('dashboard/carrito')
}
dashboard.showMenu = (req, res) => {
    res.render('dashboard/visualizar/:estado')
}
dashboard.listar = async (req, res) => {
    const ids = req.params.id;
    
    // Consulta para entradas
    const lista1 = await sql.query('select * from entradas where estado = "activo"', [ids]);
    
    // Consulta para bebidas
    const lista2 = await sql.query('select * from bebidas where estado = "activo"', [ids]);
    // Consulta para postres
    const lista3 = await sql.query('select * from postres where estado = "activo"', [ids]);
    // Consulta para sopas
    const lista4 = await sql.query('select * from sopas where estado = "activo"', [ids]);
    
    // Combinar los resultados de ambas consultas en un solo objeto de datos
    const datos = { lista1, lista2, lista3, lista4 };

    // Renderizar la vista con el objeto de datos combinado
    res.render('dashboard/visualizar', datos);
}

module.exports = dashboard