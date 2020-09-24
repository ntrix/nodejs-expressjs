const shortid = require('shortid');

const db = require('../shared/db');
const users = db.get('users').value();
const books = db.get('books').value();

module.exports = {

  index: (req, res) => {
    const trans = db.get('trans').value();
    var transList = trans.map(t => ({
      id: t.id,
      title: db.get('books').find({ id: t.bookId }).value().title,
      username: db.get('users').find({ id: t.userId }).value().username,
      isComplete: t.isComplete
    }) );
    res.render("trans/index", { trans: transList });
  },
  
  create: (req, res) => {
      res.render("trans/create", { users: users, books: books });
  },
  
  complete: (req, res) => {
    const matchedTran = db.get('trans').find({ id: req.params.id });
    if (!matchedTran.value()) res.send('Transaction(id) does not exist'); // or render error page
    
    matchedTran.set('isComplete', true).write();
    res.redirect('back');
  },
  
  postCreate: (req, res) => {
    req.body.id = 't' + shortid.generate();
    db.get('trans').push(req.body).write();
    res.redirect(req.baseUrl);
  }
}
