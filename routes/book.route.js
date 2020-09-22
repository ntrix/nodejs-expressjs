const express = require("express");
const shortid = require('shortid');

const db = require('../shared/db');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false}));
router.use(express.static("public"));

const books = db.get('books').value();

router.use(userRoutes);

router.get("/", (req, res) => {
  res.render("index");
});

router.post('/books/add', (req, res) => {
  req.body.id = shortid.generate();
  if (req.body.title.length){
    db.get('books').push(req.body).write();
    res.redirect('back');
  }
})

router.get("/books", (req, res) => {
  res.render("books/index", { books: books });
});

router.get('/books/upd/:id', (req, res) => {
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

router.get('/books/del/:id', (req, res) => {
  db.get('books').remove({ id: req.params.id }).write();
  res.redirect('back');
})

const listener = router.listen(process.env.PORT, () => {
  console.log("Your router is listening on port " + listener.address().port);
});
