const { Sequelize } = require("sequelize");

const { MYSQLHOST, MYSQLUSER, MYSQLPASSWORD, MYSQLDATABASE, MYSQLPORT, MYSQL_URI, } = require("../keys");

const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
	host: MYSQLHOST,
	port: MYSQLPORT,
	dialect: 'mysql'
});

sequelize.authenticate()
	.then(() => {
		console.log("conectado");
	})
	.catch((err) => {
		console.log("no se conecto");
	});

sequelize.sync({ force: false })
	.then(() => {
		console.log("tablas sincronizadas");
	});

	const tiendaModel = require('../models/tienda') 
	const dueñoModel = require('../models/dueño') 
	const clienteModel = require('../models/gerente'); 
	const carroModel = require('../models/carro')
	const metodoModel = require('../models/metodos')
	const postresModel = require('../models/postres')
	const sopasModel = require('../models/sopas')
	const bebidasModel	= require('../models/bebidas')
	const entradaModel = require('../models/entradas')

	
	//sincronia
	
	const restaurantes =  tiendaModel(sequelize, Sequelize)
	const dueño = dueñoModel(sequelize, Sequelize)
	const cliente = clienteModel(sequelize, Sequelize)
	const metodo = metodoModel(sequelize, Sequelize)
	const carro = carroModel(sequelize, Sequelize)
	const postres = postresModel(sequelize, Sequelize)
	const sopas = sopasModel(sequelize, Sequelize)
	const entrada = entradaModel(sequelize, Sequelize)
	const bebida = bebidasModel(sequelize, Sequelize)
	

	dueño.hasMany(restaurantes)
	restaurantes.belongsTo(dueño)

	restaurantes.hasMany(postres)
	postres.belongsTo(restaurantes)
	
	restaurantes.hasMany(sopas)
	sopas.belongsTo(restaurantes)
	
	restaurantes.hasMany(entrada)
	entrada.belongsTo(restaurantes)
	
	restaurantes.hasMany(bebida)
	bebida.belongsTo(restaurantes)
	
	restaurantes.hasMany(metodo)
	metodo.belongsTo(restaurantes)

	restaurantes.hasMany(carro)
	carro.belongsTo(restaurantes)


	
	module.exports = {
		dueño,
		restaurantes,
		cliente,
		postres,
		bebida,
		sopas,
		entrada,
		carro,
		metodo
	};
