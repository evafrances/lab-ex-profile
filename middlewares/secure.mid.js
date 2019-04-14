const createError = require('http-errors');
 
module.exports.isAuthenticated = (req, res, next) => { //check if the user is authenticated and redirect to login if necessary
  if(req.isAuthenticated()) { //passport method, it will return a boolean
    next() //le damos paso al controlador. 
  } else {
    res.redirect('/login') //si no está authenticado, lo redireccionamos. 
  }
}
// Está función la llamamos en el router, para que antes de pasar al controlador valide si el usuario puede acceder. 