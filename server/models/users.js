const Joi = require('joi');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;


// Schema of user collection
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,

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
    required: true,
  },
});

// validating user using joi
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(user);
}


// creating a model of user schema
const User = mongoose.model('User', userSchema);


exports.User = User;
exports.validate = validateUser;
