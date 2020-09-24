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
  
  if (user.wrongLoginCount == 4)
    errors.push("Too many fail attempts! Please try again in 24 hours or reset your password.");
  else if (!user)
    errors.push("User does not exist!")
  else if (password && !bcrypt.compareSync(password, user.password)) {
    foundUser.set('wrongLoginCount', (user.wrongLoginCount || 0) + 1).write();
    errors.push("Wrong password! " + user.wrongLoginCount + " of 4 attempts.");
  }

  if (errors.length) {
    res.render("auth/login", { errors: errors, values: req.body });
    return;
  }
  //user.wrongLoginCount = 0;
  foundUser.set('wrongLoginCount', 0).write();
  
  res.cookie('user-id', user.id);
  res.cookie('is-admin', user.isAdmin || false);
  res.redirect('/trans');
}

