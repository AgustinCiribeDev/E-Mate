const mainControllers = require('./../controllers/mainControllers');
const express = require('express');
const router = express.Router();

router.get('/', mainControllers.index);

router.get('/register', mainControllers.register);

router.get('/login', mainControllers.login);

router.get('/product', mainControllers.product);

router.get('/cart', mainControllers.cart);


module.exports = router;