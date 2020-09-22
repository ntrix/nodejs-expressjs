const express = require("express");
const router = express.Router();
const shortid = require('shortid');

const db = require('../shared/db');
const trans = db.get('trans').value();
const users = db.get('users').value();
const books = db.get('books').value();

router.get('/', (req, res) => {
  let joinTrans = trans.map(t => {
    let tran = {
      title: books.find(b => b.id == t.bookId).title,
      username: users.find(u => u.id == t.userId).username
    }
    return tran;
  });
  res.render("trans/index", { trans: joinTrans });
});

router.get('/create', (req, res) => {
  res.render("trans/create", { users: users, books: books });
});

router.post('/create', (req, res) => {
  //if (req.body.userId.length && req.body.bookId.length){
    req.body.id = shortid.generate();
    db.get('trans').push(req.body).write();
    res.redirect(req.baseUrl);
  //}
})

module.exports = router;