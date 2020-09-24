const shortid = require('shortid')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const db = require('../shared/db');
const users = db.get('users').value();

module.exports.login = (req, res) => {
  res.render("auth/login");
}

module.exports.postLogin = (req, res, next) => {
  const errors = res.locals.errors;
  const email = req.body.email;
  const password = req.body.password;
  //const hash = bcrypt.hashSync(req.body.password, salt);
  
  const user = db.get('users').find({ email: email }).value();

  if (!user)
    errors.push("User does not exist!")
  else if (!bcrypt.compareSync(password, user.password)) {
    errors.push("Password is missmatched")
    db.get('users').
  }

  if (errors.length) {
    res.render("auth/login", { errors: errors, values: req.body });
    return;
  }
  res.cookie('user-id', user.id);
  res.cookie('is-admin', user.isAdmin || false);
  res.redirect('/trans');
}

