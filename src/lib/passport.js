const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const orm = require('../Database/dataBase.orm');
const sql = require('../Database/dataBase.sql');
const helpers = require('./helpers');
const { cifrarDatos } = require('./encrypDates');


//! Iniciar Sesion
passport.use(
	"local.signin",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const rows = await orm.dueño.findOne({ where: { email: email } });
			if (rows) {
				const user = rows;
				const validPassword = await helpers.comparePassword(
					password,
					user.password
				)
				if (validPassword) {
					req.flash(
						"message",
						"Bienvenido" + " " + user.email
					);
					done(null, user);
				} else {
					done(null, false, req.flash("message", "Datos incorrectos"));
				}
			} else {
				return done(
					null,
					false,
					req.flash("message", "El nombre de usuario no existe.")
				);
			}
		}
	)
);


//! Registro
passport.use(
	"local.signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const usuarios = await orm.dueño.findOne({ where: { email: email }});
			if (usuarios === null) {
				const { fullname, username, email, password} = req.body;
				let nuevoGerente = {
					fullname: cifrarDatos(fullname),
					username: cifrarDatos(username),
					email,
					password,
				};
				nuevoGerente.password = await helpers.hashPassword(password);
				const resultado = await orm.dueño.create(nuevoGerente);
				nuevoGerente.id = resultado.insertId;
				return done(null, nuevoGerente)
				
			} else {
				if (usuarios) {
					const usuario = usuarios;
					if (username == usuario.username) {
						done(null, false, req.flash("message", "El nombre de usuario ya existe."));
					} else {
						let nuevoGerente = {
							email,
							password
						};
						nuevoGerente.password = await helpers.encryptPassword(password);
						const resultado = await orm.dueño.create(nuevoGerente);
						nuevoGerente.id = resultado.insertId;
						return done(null, nuevoGerente);
					}
				}
			}
		}
	)
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

module.exports = passport;