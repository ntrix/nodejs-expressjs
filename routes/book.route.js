const express = require('express');
const router = express.Router();
const bookController = require('../controller/book.controller')

router.post('/add', bookController.postAdd)

router.get('/', bookController.index);

router.get('/upd/:id', bookController.update)

router.post('/upd', bookController.postUpdate)

router.get('/del/:id', bookController.delete)

module.exports = router;
