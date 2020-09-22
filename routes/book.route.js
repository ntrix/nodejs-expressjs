const express = require("express");
const router = express.Router();
const shortid = require('shortid');

const db = require('../shared/db');
const books = db.get('books').value();

router.post('/add', (req, res) => {
  if (req.body.title.length){
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('back');
  }
})

router.get('/', (req, res) => {
  res.render("books/index", { books: books });
});

router.get('/upd/:id', (req, res) => {
  res.render('books/edit', {
    books: books,
    chosenBook: books.find(b => b.id === req.params.id)
  });
})

router.post('/upd', (req, res) => {
  db.get('books').find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect('/');
})

router.get('/del/:id', (req, res) => {
  db.get('books').remove({ id: req.params.id }).write();
  res.redirect('back');
})

module.exports = router;
