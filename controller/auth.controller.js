const shortid = require('shortid')
const db = require('../shared/db');
const users = db.get('users').value();


module.exports = {
  
  index: (req, res) => {
    res.render("auth/index")
  },
  
  postLogin: (req, res) => {
    const errors = res.locals.errors;
    if (errors.length) {
      res.render("auth/index", {
        errors: errors,
        values: req.body
      });
      return;
    }
    req.body.id = 'u' + shortid.generate();
    db.get('auth').push(req.body).write();
    res.redirect('back');
  }
  
}
