const db = require('../shared/db');

module.exports = {
  requireAuth: (req, res, next) => {
    if (!req.signedCookies.userId) {
      res.redirect('/auth/login');
      return;
    }
    next();
  },
  
  isAdmin: (req, res, next) => {
    if (req.signedCookies.isAdmin)
      next();
    //else res.redirect('back');
  }
  
}