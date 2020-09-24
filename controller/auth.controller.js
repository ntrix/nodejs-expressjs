const shortid = require('shortid')
const db = require('../shared/db');
const users = db.get('users').value();

module.exports = {
  
  login: (req, res) => {
    res.render("auth/login");
  },
  
  postLogin: (req, res, next) => {
    const errors = res.locals.errors;
    const email = req.body.email;
    const password = req.body.password;
    
    const foundUser = db.get('users').find({ email: email }).value();
    if (!foundUser)
      errors.push("User does not exist!")
    else if (password !== foundUser.password)
      errors.push("Password is missmatched")
    
    if (errors.length) {
      res.render("auth/login", {
        errors: errors,
        values: req.body
      });
      return;
    }
    req.body.id = foundUser.id;
    res.redirect('/trans');
  }
  
}
