const express = require("express");
const app = express();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

var shortid = require('shortid');

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static("public"));

const books = db.defaults({ books: [] }).get('books').value();

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/books", (req, res) => {
  res.render("books", { books: books });
});

app.post('/books/add', (req, res) => {
  if (req.body.title.length){
    req.body.id = shortid.generate();
    console.log(req.body.id);
    db.get('books').push(req.body).write();
    res.redirect('back');
  }
})

app.get('/books/del/:id', (req, res) => {
  db.get('books').remove({ id: req.params.id }).write();
  res.redirect('back');
})

app.get('/books/upd/:id', (req, res) => {
  console.log(req.params.id)
  res.render('edit', {
    books: books,
    chosenBook: books.find(b => b.id === req.params.id)
  });
})

app.post('/books/upd', (req, res) => {
  console.log(req.body.id)
  db.get('books').find({ id: req.body.id })
    .set('title', req.body.title)
    .set('description', req.body.description)
    .write();
  res.redirect('/books');
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
