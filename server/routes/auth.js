const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/users');


// authenticating user for login
router.route('/').post(async (req, res) => {
  // checking whether email exists
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Invalid user or password');

  // matching password
  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) return res.status(400).send('Inavlid user or password');

  const token = user.generateAuthToken();


  res.header('x-auth-token', token).send(true);
});

module.exports = router;
