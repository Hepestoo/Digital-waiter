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
            try {
                const usuarioExistente = await orm.dueño.findOne({ where: { email: email } });
                if (usuarioExistente) {
                    return done(null, false, req.flash("success", "El correo electrónico ya está en uso."));
                }
                const { fullname, username } = req.body;
                let nuevoGerente = {
                    fullname: cifrarDatos(fullname),
                    username: cifrarDatos(username),
                    email,
                    password,
                };
                nuevoGerente.password = await helpers.hashPassword(password);
                const resultado = await orm.dueño.create(nuevoGerente);
                nuevoGerente.id = resultado.insertId;
                return done(null, nuevoGerente);
            } catch (error) {
                return done(error);
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