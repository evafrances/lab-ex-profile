const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.register = (req, res, next) => {
  res.render('auth/register');
}

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.render('auth/register', {
      user: req.body,
      errors: errors
    })
  }
  
  User.findOne({ email: req.body.email })
  .then(user => {
    // TODO: save user & redirect to loginn
    if (user){
      renderWithErrors ({email: 'email already register'})
    }else{
      user = new User (req.body);
        return user.save()
          .then (user =>res.redirect('/login'))
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors)
      } else {
        next(error);
      }
    });
}

module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

module.exports.doLogin = (req, res, next) => {
  passport.authenticate('local-auth', (err, user, validation) => {
    if(err) { //si hay algún error. 
      next(next) //lo enviamos al handle error.
    } else if (!user){ //si no hay usuario por parte de passport
      res.render('auth/login', { //renderizamos un error. 
        user: req.body,
        errors: validation //le enviamos el sistema de validación que definimos en el modelo
      })
    } else { //si encontró al usuario y coincide su contraseña      
      //llamamos al metodo login de passport y y le pasamos el usuario encontrado y una función por si hay errores
      return req.login(user, (err) => { 
        if(err) {
          next(err)
        } else {
          res.redirect('/profile')
        }
      })
    }
  })(req, res, next);
}

module.exports.loginWithGoogleCallback = (req, res, next) => {
  // TODO: passport google-auth authentication & redirect to /profile
}

module.exports.profile = (req, res, next) => {
  res.render('auth/profile')
}

module.exports.doProfile = (req, res, next) => {
  // TODO: edit connect user profile, remember password is not a required field and the avatarURL
  // is provided by the storage configuration
}

module.exports.logout = (req, res, next) => {
  // TODO: logout and redirect to login
}
