const router = require('express').Router();
const bcrypt = require('bcrypt');
const {User} = require('../models/users');
const auth = require('../middleware/auth');


// authenticating user for login
router.route('/').post(async (req, res) => {
  // checking whether email exists
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).json({
      'login': 'Failed',
      'error': 'Invalid email',
    });
  }

  // matching password
  const result = await bcrypt.compare(req.body.password, user.password);
  if (!result) {
    return res.status(400).json({
      'login': 'Failed',
      'error': 'Inorrect Password',
    });
  }

  // generating tokens after login
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).json({
    'login': 'Successful',
  });
});


router.route('/logout').get(auth, async (req, res)=>{
  res.header('x-auth-token', '').json({
    'logout': 'Successful',
  });
});

module.exports = router;
