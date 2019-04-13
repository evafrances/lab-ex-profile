const User = require('../models/user.model');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
 
passport.serializeUser((user, next) => {
  // TODO: write user unique information to cookie
  next(null, user.id);
})

passport.deserializeUser((id, next) => {
  // TODO: read user from cookie
  User.findById(id)
    .then(user => next(null, user))
    .catch(next)
})

passport.use('local-auth', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, next) => {
  // TODO: authenticate user using local auth, remember you need find user from and check his password,
  // then call next passing error or authenticated user or validation feedback next(error, user, validations)
  User.findOne({email: email})
    .then(user => {
      if (!user){
        next(null, null, {password: 'invalid email or password'})
      }else{
        return user.checkPassword(password)
          .then(match => {
            if(!match){
              next(null, null, {password: 'invalid email or password'})
            }else{
              next(null, user)
            }
        })
      }
    })
}));

/*
passport.use('google-auth', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/authenticate/google/cb'
}, (accessToken, refreshToken, profile, next) => {
  // TODO: authenticate user using google
}));
*/
