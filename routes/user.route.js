const express = require('express');
const shortid = require('shortid');

const db = require('../shared/db');
const router = express.Router();


const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false}));

router.set('view engine', 'pug');
router.set('views', './views');

router.use(express.static("public"));

const users = db.get('users').value();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/users", (req, res) => {
  res.render("users/index", { users: users });
});

router.post('/users/add', (req, res) => {
  req.body.id = shortid.generate();
  console.log('post add', req.body.id)
  if (req.body.title.length){
    db.get('users').push(req.body).write();
    res.redirect('back');
  }
})

router.get('/users/del/:id', (req, res) => {
  db.get('users').remove({ id: req.params.id }).write();
  res.redirect('back');
})

router.get('/users/upd/:id', (req, res) => {
  console.log('get update', req.params.id)
  res.render('users/edit', {
    users: users,
    chosenBook: users.find(b => b.id === req.params.id)
  });
})

router.post('/users/upd', (req, res) => {
  db.get('users').find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect('/users');
})

module.exports = router;