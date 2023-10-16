const usersServices = require('./../services/usersServices');
const productsServices = require('./../services/productsServices');
//const mainControllers = require('./../services/');

const express = require('express');
const router = express.Router();

//Endpoints  API
router.get('/usuarios', usersServices.index);

router.get('/usuarioId/:id', usersServices.usuarioId);  

router.get('/productos', productsServices.index);

router.get('/categorias', productsServices.categorias);

router.get('/productoId/:id', productsServices.productoId);  



module.exports = router;