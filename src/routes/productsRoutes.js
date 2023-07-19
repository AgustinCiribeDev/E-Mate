const express = require('express');
const router = express.Router();

const productsControllers = require('./../controllers/productsControllers');

///////////////IMAGENES
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dirx4wkl1', 
    api_key: '723134683983768', 
    api_secret: 'vTNJrOTeoaJA1vYQaNwNKdWI0SI' 
  });

router.post('/create', upload.single('imagen'), (req, res) => {
    const file = req.file;

 cloudinary.uploader.upload(file.path, (error, result) => {
    if (error) {
      console.log('Error al cargar la imagen:', error);
    } else {
      console.log('Imagen cargada correctamente:', result);
      res.json(result);
    }
  });
});


///////////////// FIN IMAGENES


router.get('/', productsControllers.index);

//Ruta de todos los productos
router.get('/productCatalogue', productsControllers.productCatalogue);

//Ruta de un producto
router.get('/productDetail/:id', productsControllers.productDetail);

//Ruta carrito de compras
router.get('/cart', productsControllers.cart);

//Rutas de crear productos
router.get('/create', productsControllers.create);
router.post('/create', productsControllers.addProduct);

//Ruta para editar un producto
router.get('/edit/:id', productsControllers.edit);
router.put('/edit/:id', productsControllers.update);

//Ruta para eliminar un producto
router.delete('/delete/:id', productsControllers.destroy);
module.exports = router;