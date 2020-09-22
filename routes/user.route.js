const express = require('express');
var shortid = require('shortid');
const router = express.Router();


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false}));

router.set('view engine', 'pug');
router.set('views', './views');

router.use(express.static("public"));

const users = db.defaults({ books: [] }).get('users').value();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/books", (req, res) => {
  res.render("books/index", { books: books });
});

router.post('/books/add', (req, res) => {
  req.body.id = shortid.generate();
  console.log('post add', req.body.id)
  if (req.body.title.length){
    db.get('books').push(req.body).write();
    res.redirect('back');
  }
})

router.get('/books/del/:id', (req, res) => {
  db.get('books').remove({ id: req.params.id }).write();
  res.redirect('back');
})

router.get('/books/upd/:id', (req, res) => {
  console.log('get update', req.params.id)
  res.render('books/edit', {
    books: books,
    chosenBook: books.find(b => b.id === req.params.id)
  });
})

router.post('/books/upd', (req, res) => {
  db.get('books').find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect('/books');
})