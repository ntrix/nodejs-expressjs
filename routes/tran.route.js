const express = require("express");
const router = express.Router();

router.get('/', );

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
