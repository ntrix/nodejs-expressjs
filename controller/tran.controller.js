const shortid = require('shortid');

const db = require('../shared/db');
const trans = db.get('trans').value();
const users = db.get('users').value();
const books = db.get('books').value();

module.exports = {

  index: (req, res) => {
    var joinTrans = trans.map(t => {
      var tran = {
        title: books.find(b => b.id == t.bookId).title,
        username: users.find(u => u.id == t.userId).username
      }
      return tran;
    });
    res.render("trans/index", { trans: joinTrans });
  },
  
  create: (req, res) => {
    res.render("trans/create", { users: users, books: books });
  },
  
  postCreate: (req, res) => {
      req.body.id = shortid.generate();
      db.get('trans').push(req.body).write();
      res.redirect(req.baseUrl);
  }
  
}
