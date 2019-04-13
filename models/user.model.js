const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EMAIL_PATTERN = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [3, 'Name needs at last 8 chars'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [EMAIL_PATTERN, 'Invalid email pattern']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password needs at last 8 chars']
  }
  // TODO: avatar & social login attrs
}, { timestamps: true })

userSchema.pre('save', function(next) {
  const user = this;
  // TODO: password hashing if necessary
  if (user.isModified("password")){
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(user.password, salt)) 
        .then(hash => {
          user.password = hash;
          next();
      })
      .catch(error => next(error))
  }
  else{
    next()
  }
});

userSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password)
}
// TODO: checkPassword method

const User = mongoose.model('User', userSchema);
module.exports = User;
