const mainControllers = require('./../controllers/mainControllers');
const express = require('express');
const router = express.Router();

router.get('/', mainControllers.index);

router.get('/register', mainControllers.register);

router.get('/login', mainControllers.login);

router.get('/product', mainControllers.product);

router.get('/cart', mainControllers.cart);

router.get('/create', mainControllers.create);

router.post('/create', mainControllers.addproduct);

router.get('/products', mainControllers.products);

module.exports = router;