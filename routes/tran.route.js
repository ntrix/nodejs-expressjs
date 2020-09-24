const express = require('express');
const router = express.Router();
const tranController = require('../controller/tran.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware.requireAuth);

router.get('/', tranController.index);

router.get('/create', tranController.create);

router.post('/create', tranController.postCreate);

router.get('/:id/complete', tranController.complete);

module.exports = router;
