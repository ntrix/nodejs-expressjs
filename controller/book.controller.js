
const shortid = require('shortid');

const db = require('../shared/db');
const books = db.get('books').value();

module.exports = {
  index: (req, res) => {
    res.render("books/index", { books: books });
  },
  
  add: 
}