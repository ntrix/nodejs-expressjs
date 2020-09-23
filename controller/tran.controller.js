const shortid = require('shortid');

const db = require('../shared/db');
const trans = db.get('trans').value();
const users = db.get('users').value();
const books = db.get('books').value();

module.exports = {

  index: (req, res) => {
    var joinTrans = trans.map(t => {
      var tran = {
        id: t.id,
        title: books.find(b => b.id == t.bookId).title,
        username: users.find(u => u.id == t.userId).username,
        isComplete: t.isComplete
      }
      return tran;
    });
    res.render("trans/index", { trans: joinTrans });
  },
  
  create: (req, res) => {
    res.render("trans/create", { users: users, books: books });
  },
  
  postCreate: (req, res) => {
    req.body.id = 't' + shortid.generate();
    db.get('trans').push(req.body).write();
    res.redirect(req.baseUrl);
  },
  
  complete: (req, res) => {
    console.log(req.path, req.params.id);
    db.get('trans').find({ id: req.params.id }).set('isComplete', true).write();
    res.redirect('back');
  }  
}
