const db = require('../shared/db');

module.exports = {
  requireAuth: (req, res, next) => {
    if (!req.cookies.userId) {
      res.redirect('/auth/login');
      return;
    }
    next();
  },
  
  isAdmin: (req, res, next) => {
    if (req.cookies.isAdmin)
      next();
    //else res.redirect('back');
  }
  
}