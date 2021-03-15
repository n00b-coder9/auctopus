const router = require('express').Router();
const {User, validate} = require('../models/users');
const bcrypt = require('bcrypt');

// registering user
router.route('/').post(async (req, res) => {
  // validating fields
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // finding whether user already exists
  const result = await User.findOne({email: req.body.email});
  if (result) {
    return res.status(400).json({
      'signup': 'Failed',
      'error': 'user already exists',
    });
  }

  // creating new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
    // hashing password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);

  // inserting into users collections
  user.save()
      .then((message) => res.json({
        'signup': 'Successful',
        '_id': message._id,
        'name': message.name,
        'email': message.email,
      }))
      .catch((err) => res.status(400).json({
        'error': err,
      }));
});


module.exports= router;


