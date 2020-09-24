const express = require('express');
const router = express.Router();
const validate = require('../validate/auth.validate');

const authController = require('../controller/auth.controller')

router.post('/login', validate.postLogin, authController.postLogin);

router.get('/login', authController.login);

module.exports = router;