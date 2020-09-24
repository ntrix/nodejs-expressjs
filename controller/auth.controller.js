const shortid = require('shortid')
const db = require('../shared/db');
const users = db.get('users').value();

module.exports = {
  
  login: (req, res) => {
    res.render("auth/login");
  },
  
  postLogin: (req, res) => {
    const errors = res.locals.errors;
    const foundUser = db.get('users').find({ email: req.body.email});
    
    if (!foundUser.value())
      errors.push("User (user's email) does not exist!")
    if (foundUser.value().password !== req.body.password)
      errors.push("Password is not matched")
      
    if (errors.length) {
      res.render("auth/login", {
        errors: errors,
        values: req.body
      });
      errors.length = 0; //also reset res.locals.errors;
      return;
    }
    req.body.id = foundUser.value().id;
    db.get('auth').push(req.body).write();
    res.redirect('back');
  }
  
}
