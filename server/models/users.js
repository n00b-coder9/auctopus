
const mongoose = require('mongoose');


const Schema = mongoose.Schema;


// Schema of user collection
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,

  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  favourites: {
    type: Array,
  },
});


const User = mongoose.model('User', userSchema);

exports.User = User;
