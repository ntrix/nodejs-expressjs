const db = require('../shared/db');

module.exports.requireAuth = (req, res, next) => {
  if (!req.cookies['user-id']) {
    res.redirect('/auth/login');
    return;
  }
  res.locals.path = req.path;
  next();
}