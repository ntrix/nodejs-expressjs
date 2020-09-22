const express = require("express");
const router = express.Router();
const shortid = require('shortid');

const db = require('../shared/db');
const trans = db.get('transactions').value();

router.post('/add', (req, res) => {
  if (req.body.title.length){
    req.body.id = shortid.generate();
    db.get('transactions').push(req.body).write();
    res.redirect('back');
  }
})

router.get('/', (req, res) => {
  res.render("transactions/index", { transactions: trans });
});

router.get('/upd/:id', (req, res) => {
  res.render('transactions/create', {
    transactions: trans,
    chosenTrans: trans.find(b => b.id === req.params.id)
  });
})

router.post('/upd', (req, res) => {
  console.log(req)
  db.get('transactions').find({ id: req.body.id })
    .assign(req.body)
    .write();
  res.redirect(req.baseUrl);
})

router.get('/del/:id', (req, res) => {
  db.get('transactions').remove({ id: req.params.id }).write();
  res.redirect(req.baseUrl);
})

module.exports = router;
