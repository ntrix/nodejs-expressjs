const express = require("express");
const router = express.Router();

router.post('/add', (req, res) => {
  if (req.body.title.length){
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('back');
  }
})

router.get('/', index);

router.get('/upd/:id', (req, res) => {
  res.render('books/edit', {
    books: books,
    chosenBook: books.find(b => b.id === req.params.id)
  });
})

router.post('/upd', (req, res) => {
  console.log(req)
  db.get('books').find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect(req.baseUrl);
})

router.get('/del/:id', (req, res) => {
  db.get('books').remove({ id: req.params.id }).write();
  res.redirect(req.baseUrl);
})

module.exports = router;
