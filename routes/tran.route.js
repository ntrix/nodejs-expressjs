const express = require("express");
const router = express.Router();
const shortid = require('shortid');

const db = require('../shared/db');
const trans = db.get('trans').value();
const users = db.get('users').value();
const books = db.get('books').value();

router.get('/', (req, res) => {
  res.render("trans/index", { trans: trans });
});

router.get('/create', (req, res) => {
  res.render("trans/create", { users: users, books: books });
});

router.post('/create', (req, res) => {
  if (req.body.title.length){
    req.body.id = shortid.generate();
    db.get('trans').push(req.body).write();
    res.redirect('back');
  }
})

module.exports = router;
