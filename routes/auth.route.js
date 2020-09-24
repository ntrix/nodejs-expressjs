const express = require('express');
const router = express.Router();
const validate = require('../validate/user.validate');

const authController = require('../controller/auth.controller')

router.post('/login', validate.postLogin, authController.postLogin);

router.get('/', authController.login);

module.exports = router;