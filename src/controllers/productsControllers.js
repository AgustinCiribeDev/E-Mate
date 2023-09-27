const fs = require('fs');
const path = require('path'); // ver si hace falta, pero al final
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { log } = require('console');
const db = require('../database/models'); // Base de Datos

cloudinary.config({ 
    cloud_name: 'dirx4wkl1', 
    api_key: '723134683983768', 
    api_secret: 'vTNJrOTeoaJA1vYQaNwNKdWI0SI',
});
  
  const productsFilePath = path.join(__dirname, '../database/productos.json');
  let productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const  productsControllers = {
  
  // Método GET Productos
  productCatalogue: (req,res)=>{
    db.Producto.findAll ()
    .then ((productos) => {
      return res.render('products/productCatalogue',{productos:productos});
    })
  },
  
  // Método GET Detalle de Productos
  productDetail: (req, res) => {
    db.Producto.findByPk (req.params.id, {include: [{association: "ventas"},{association: "usuario"}, {association: "categoria"}]})
      .then ((producto) => {
      res.render('products/productDetail', {producto: producto});
    })
  },
        
  // Método GET crear productos
  create: (req, res) => {
    db.Producto.findAll ()
      .then ((producto) => {
      res.render('products/productCreate', {producto:producto});
    })
  },
  
  // Método POST crear productos
  addProduct: async (req, res) => {

    // Express Validator
    const resultValidation = validationResult(req);
       
    if(resultValidation.errors.length > 0) {
      return res.render('products/productCreate', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    } 
    
    const imageBuffer = req.file.buffer;
    const nombreImagen = Date.now() + req.file.originalname;
    
    // Se genero url de imagen
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: nombreImagen }, (error, result) => {
    if (error) {
      console.log('Error al cargar la imagen:', error);
      res.status(500).send('Error al cargar la imagen');
    } else {
      console.log('Imagen cargada correctamente:', result);
      
    // Creando el objeto nuevo de producto en la BD
    db.Producto.create({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: result ? result.secure_url : null,
      stock: req.body.stock,
      estado: req.body.estado,
      descuento: req.body.descuento,
      cuota: req.body.cuota,
      usuario_id: req.body.usuario,
      categoria_id: req.body.categoria,
      })
      .then((resultados)  => { 
      res.redirect('/');
      })
      .catch((error) => {
      console.error(error)
      });   
    }
  });   
  streamifier.createReadStream(imageBuffer).pipe(stream);
  },

  // Método GET Editar Productos
  edit: (req,res) => {
    db.Producto.findByPk (req.params.id, {include: [{association: "ventas"},{association: "usuario"}, {association: "categoria"}]})
    .then ((producto) => {
    res.render('products/productEdit', {producto: producto});
    })
  },

  // Método PUT para Editar Productos
  update: async (req,res) => {

    // Express Validator
    const resultValidation = validationResult(req);
    const producto = await db.Producto.findByPk (req.params.id, {include: [{association: "ventas"},{association: "usuario"}, {association: "categoria"}]})
       
    if(resultValidation.errors.length > 0) {
      return res.render('products/productEdit',  {
        errors: resultValidation.mapped(),
        oldData: req.body,
        producto: producto
      });
    } 
    
    const imageBuffer = req.file.buffer;
    const nombreImagen = Date.now() + req.file.originalname;
    
    // Se genero url de imagen
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: nombreImagen }, (error, result) => {
    if (error) {
      console.log('Error al cargar la imagen:', error);
      res.status(500).send('Error al cargar la imagen');
    } else {
      console.log('Imagen cargada correctamente:', result);
      
    // Editando el producto en la BD
    db.Producto.update({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      imagen: result ? result.secure_url : null,
      stock: req.body.stock,
      estado: req.body.estado,
      descuento: req.body.descuento,
      cuota: req.body.cuota,
      usuario_id: req.body.usuario,
      categoria_id: req.body.categoria,
      }, {where: {
        id: req.params.id
      }})
      .then((resultados) => { 
      res.redirect('/');
      })
      .catch((error) => {
      console.error(error)
      });
    }
    });
    streamifier.createReadStream(imageBuffer).pipe(stream);
  },
   
  // Método PUT para Editar Productos     
  destroy: (req,res) => {
    db.Producto.destroy ({
      where: {
        id: req.params.id
      }
    })
    res.redirect('/');
  },

  // ¿Para qué es este método?  
  local: (req,res) => {
    db.Producto.findAll ()
      .then ((producto) => {
        return res.render('products/localProducts', {producto:producto});
      })
  },

  // Método GET Carrito  
  cart: (req,res) => {
    res.render('products/productCart');
  }

};

module.exports = productsControllers;