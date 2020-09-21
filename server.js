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


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
