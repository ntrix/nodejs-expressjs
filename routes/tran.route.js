const express = require('express');
const router = express.Router();
const tranController = require('../controller/tran.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware.requireAuth);

router.get('/', tranController.index);

router.get('/create', authMiddleware.isAdmin, tranController.create);

router.post('/create', authMiddleware.isAdmin, tranController.postCreate);

router.get('/:id/complete', authMiddleware.isAdmin, tranController.complete);

module.exports = router;
