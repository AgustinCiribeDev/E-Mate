const express = require('express');
const router = express.Router();

const productsControllers = require('./../controllers/productsControllers');

//Configurando Multer
const multer = require('multer');
const upload = multer();


router.get('/', productsControllers.index);

//Ruta de todos los productos
router.get('/productCatalogue', productsControllers.productCatalogue);

//Ruta de un producto
router.get('/productDetail/:id', productsControllers.productDetail);

//Ruta carrito de compras
router.get('/cart', productsControllers.cart);

//Rutas de crear productos
router.get('/create', productsControllers.create);
router.post('/create', upload.single('imagen'),  productsControllers.addProduct);

//Ruta para editar un producto
router.get('/edit/:id', productsControllers.edit);
router.put('/edit/:id', upload.single('imagen'), productsControllers.update);

//Ruta para eliminar un producto
router.delete('/delete/:id', productsControllers.destroy);
module.exports = router;