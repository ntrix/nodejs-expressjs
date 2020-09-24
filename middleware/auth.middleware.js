const db = require('../shared/db');

module.exports = {
  requireAuth: (req, res, next) => {
    if (!req.cookies['user-id']) {
      res.redirect('/auth/login');
      return;
    }
    next();
  },
  
  isAdmin: (req, res, next) => {
    if (req.cookies['is-admin'] === 'true')
      next();
    //else res.redirect('back');
  }
  
}