require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('./config/session.config')
const passport = require ('passport')
require('./config/passport.config');
require('./config/db.config');
require('./config/hbs.config');
// TODO: require passport & session config

const authRouter = require('./routes/auth.routes');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
// Aqui guardamos en passport los datos del usuario authenticado. 
// De esta forma podemos acceder a estos datos desde cualquier lugar handlebar, o controlador, o lo que sea
app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.session = req.user;
  next();
})

// TODO: apply session & passport configuration with app.use(...)
app.get('/', (req, res, next) => res.redirect('/login'))
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
