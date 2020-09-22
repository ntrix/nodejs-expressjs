const express = require('express');
const router = express.Router();
const tranController = require('../controller/tran.controller');

router.get('/', tranController.index);

router.get('/create', tranController.create);

router.post('/create', tranController.postCreate);

module.exports = router;
