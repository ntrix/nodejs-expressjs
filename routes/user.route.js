const express = require('express');
const router = express.Router();
const shortid = require('shortid')
const userController = require('../controller/user.controller')


router.post('/add', (req, res) => {
  if (req.body.username.length){
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('back');
  }
})

router.get('/',userController.index);

router.get('/upd/:id', (req, res) => {
  res.render('users/edit', {
    users: users,
    chosenUser: users.find(u => u.id === req.params.id)
  });
})

router.post('/upd', (req, res) => {
  db.get('users').find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect(req.baseUrl);
})

router.get('/del/:id', (req, res) => {
  db.get('users').remove({ id: req.params.id }).write();
  res.redirect(req.baseUrl);
})

module.exports = router;