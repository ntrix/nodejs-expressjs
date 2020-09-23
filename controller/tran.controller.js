const shortid = require('shortid');

const db = require('../shared/db');
const trans = db.get('trans').value();
const users = db.get('users').value();
const books = db.get('books').value();

module.exports = {

  index: (req, res) => {
    var joinTrans = trans.map(t => {
      {
        id: t.id,
        title: db.get('books').find({ id: t.bookId }).value().title,
        username: db.get('users').find({ id: t.userId }).value().username,
        isComplete: t.isComplete
      }
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
    db.get('trans').find({ id: req.params.id }, (err, data) => {
      if (err)
        res.send(err); //render error page
    }).set('isComplete', true).write();
    res.redirect('back');
  }  
}
