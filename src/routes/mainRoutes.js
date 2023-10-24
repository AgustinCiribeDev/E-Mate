const mainControllers = require('./../controllers/mainControllers');
const express = require('express');
const router = express.Router();

router.get('/', mainControllers.index);

router.get('/search', mainControllers.search);

module.exports = router;