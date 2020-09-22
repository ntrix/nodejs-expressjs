const express = require('express');
const router = express.Router();
const shortid = require('shortid');

const db = require('../shared/db');
const users = db.get('users').value();

router.post('/users/add', (req, res) => {
  if (req.body.username.length){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('back');
  }
})

router.get("/users", (req, res) => {
  res.render("users/index", { users: users });
});

router.get('/users/upd/:id', (req, res) => {
  res.render('users/edit', {
    users: users,
    chosenUser: users.find(u => u.id === req.params.id)
  });
})

router.post('/users/upd', (req, res) => {
  db.get('users').find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect('/users');
})

router.get('/users/del/:id', (req, res) => {
  db.get('users').remove({ id: req.params.id }).write();
  res.redirect('back');
})

module.exports = router;