const express = require('express');
const router = express.Router();
const validate = require('../validate/auth.validate');

const authController = require('../controller/auth.controller')

router.post(validate.postLogin, authController.postLogin);

router.use(authController.login);

module.exports = router;