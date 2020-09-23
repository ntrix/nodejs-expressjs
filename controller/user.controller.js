const shortid = require('shortid')
const db = require('../shared/db');
const users = db.get('users').value();

const validate = require('../validate/user.validate');

module.exports = {
  
  index: (req, res) => {
    res.render("users/index", { users: users })
  },
  
  update: (req, res) => {
    res.render('users/edit', {
      users: users,
      chosenUser: users.find(u => u.id === req.params.id)
    });
  },
  
  postAdd: (req, res) => {
    const errors = validate.postAdd(req);
    if (errors.length) {
      console.log(errors)
      res.render("users/index", { errors: errors, users: users });
    }
    req.body.id = 'u' + shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('back');
  },
  
  postUpdate: (req, res) => {
    db.get('users').find({ id: req.body.id })
      .assign(req.body)
      .write();
    res.redirect(req.baseUrl);
  },
  
  delete: (req, res) => {
    db.get('users').remove({ id: req.params.id }).write();
    res.redirect(req.baseUrl);
  }
  
}
