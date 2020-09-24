const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller')
const validate = require('../validate/auth.validate');

router.post('/add', validate.postAdd, authController.postAdd);

router.get('/', authController.index);

router.get('/upd/:id', authController.update);

router.post('/upd', authController.postUpdate);

router.get('/del/:id', authController.delete);

module.exports = router;