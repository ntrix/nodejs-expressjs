const shortid = require('shortid')
const db = require('../shared/db');
const users = db.get('users').value();

module.exports = {
  
  login: (req, res) => {
    res.render("auth/login");
  },
  
  postLogin: (req, res, next) => {
    const errors = res.locals.errors;
    const foundUser = db.get('users').find({ email: req.body.email});
    if (!foundUser.value())
      errors.push("User (user's email) does not exist!")
    else if (req.body.password !== foundUser.value().password)
      errors.push("Password is missmatched")
    if (errors.length) {
      res.render("auth/login", {
        errors: errors,
        values: req.body
      });
      return;
    }
    req.body.id = foundUser.value().id;
    next();
  }
  
}
