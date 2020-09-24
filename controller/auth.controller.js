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
  
  const foundUser = db.get('users').find({ email: email });
  const user = foundUser.value();

  if (!user)
    errors.push("User does not exist!")
  else if (!bcrypt.compareSync(password, user.password)) {
    errors.push("Password is missmatched")
    
    foundUser.set('failAttempts', (user.failAttempts || 0) + 1).write();
    
    console.log(user.failAttempts, foundUser.value().failAttempts, db.get('users').find({ email: email }).value().failAttempts)
  }

  if (errors.length) {
    res.render("auth/login", { errors: errors, values: req.body });
    return;
  }
  res.cookie('user-id', user.id);
  res.cookie('is-admin', user.isAdmin || false);
  res.redirect('/trans');
}

