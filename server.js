const express = require("express");
const app = express();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('books.json')
const db = low(adapter)

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static("public"));

const books = db.value();
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/books", (req, res) => {
  res.render("books", { books: books });
});

app.post('/books/add', (req, res) => {
  if (req.body.title.length){
    console.log(req.body.title)
    db.push({
      id: books.length + 1,
      title: req.body.title,
      description: req.body.description,
    }).write();
    res.redirect('back');
  } 
})

app.get('/books/del/:id', (req, res) => {
  db.remove({ id: +req.params.id }).write();
  res.redirect('back');
})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
