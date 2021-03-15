const jwt = require('jsonwebtoken');


// authorization
function auth(req, res, next) {
  // checking whether token exists
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('No token');

  // verifying token
  try {
    const payload = jwt.verify(token, process.env.jwtkey);
    req.user = payload;
    next();
  } catch (ex) {
    res.status(400).send('Access denied..Invalid token');
  }
}

module.exports=auth;
