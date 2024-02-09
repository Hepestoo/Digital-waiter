const login = {}




const passport = require("passport")

//!LOGIN
login.show = async (req, res) => {
    res.render('login/login')
}

login.sendLogin = passport.authenticate('local.signin', {
    successRedirect: '/dashboard',
    failureFlash: '/login',
    failureFlash: true
})


//!REGISTRO

login.sendRegistro = passport.authenticate('local.signup', {
    successRedirect: '/login',
    failureRedirect: '/registro',
    failureFlash: true
});

// login.sendRegistro = (req, res, next) => {
//     console.log("Datos de registro recibidos:", req.body);
//     passport.authenticate('local.signup', {
//         successRedirect: '/login',
//         failureRedirect: '/registro',
//         failureFlash: true
//     })(req, res, next);
// };

login.showRegister = async (req, res) => {
    res.render('login/registro')
}





module.exports = login