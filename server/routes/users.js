const router = require('express').Router();
const {User, validate} = require('../models/users');
// const _ = require('lodash');


// registering user
router.route('/').post((req, res) => {
  // validating fields
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // finding whether user already exists
  User.findOne({email: req.body.email})
      .then((result) => {
        return res.status(400).send('user already exists');
      });

  // creating new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  // inserting into users collections
  user.save()
      .then((message) => res.send({
        name: message.name,
        email: message.email,
      }))
      .catch((err) => res.status(400).send('Error: ' + err));
});


module.exports= router;


