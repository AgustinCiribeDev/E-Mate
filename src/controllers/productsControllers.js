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
    /*productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    let productosOferta = productos.filter(ofertas => ofertas.estado == "En Oferta");      
    res.render('index', {productosOferta});*/
  
  productCatalogue: (req,res)=>{
    /*productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));*/
    db.Producto.findAll ()
    .then ((productos) => {
      return res.render('products/productCatalogue',{productos:productos});
    })
    /*res.render('products/productCatalogue', {productos});*/
  },
  
  productDetail: (req, res) => {
    db.Producto.findByPk (req.params.id, {include: [{association: "ventas"},{association: "usuario"}, {association: "categoria"},]})
      .then ((producto) => {
      res.render('products/productDetail', {producto: producto});
    })
  },
        
        
        //Editar Productos
        edit: (req, res) => {
          res.render('products/productEdit');
        },
        
  // Método crear productos
  create: (req, res) => {
    db.Producto.findAll ()
      .then ((producto) => {
      res.render('products/productCreate', {producto:producto});
    })
  },
  
  // Método crear un producto nuevo
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
 
    /*try {
      const imageBuffer = req.file.buffer;
      const nombreImagen = Date.now() + req.file.originalname;
      const result = await cloudinary.uploader.upload(imageBuffer, {
        resource_type: 'image',
        public_id: nombreImagen,
      });
    
      if (result) {
        console.log('Imagen cargada correctamente:', result);
        const newProduct = await db.Producto.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precioActual,
        imagen: result.secure_url,
        stock: req.body.stock,
        estado: req.body.estado,
        descuento: req.body.descuento,
        cuota: req.body.cuota,
        categoria_id: req.body.categoria,
        });
        res.redirect('/');
      } 
      else {
          console.log('Error al cargar la imagen:', error);
          res.status(500).send('Error al cargar la imagen');
      }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto' });
      }
      streamifier.createReadStream(imageBuffer).pipe(stream);*/
  },

    /* const imageBuffer = req.file.buffer;
    const nombreImagen = Date.now() + req.file.originalname;   
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: nombreImagen }, (error, result) => {
      if (error) {
        console.log('Error al cargar la imagen:', error);
          res.status(500).send('Error al cargar la imagen');
      } 
      else {
        console.log('Imagen cargada correctamente:', result);
          //Aquí, en lugar de almacenar solo el nombre de la imagen,
          // almacenamos la URL completa de Cloudinary en el objeto del nuevo producto
         
          let idNuevoProducto = (productos[productos.length - 1].id) + 1;
          let objNuevoProducto = {
          id: idNuevoProducto,
          nombre: req.body.nombre,
          precioActual: parseInt(req.body.precioActual),
          categoria: req.body.categoria,
          descripcion: req.body.descripcion,
          cuotas: parseInt(req.body.cuotas),
          estado: req.body.estado,
          descuento: parseInt(req.body.descuento),
          imagen: result ? result.secure_url : null // Almacenamos la URL completa de Cloudinary si result está definido, de lo contrario, usamos null
          };
        
          productos.push(objNuevoProducto);
          fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
        
              res.redirect('/');
            }
          }); */

        // Buscar producto a editar
        edit: (req,res) => {
          let idProducto= req.params.id;
		      let productoBuscado;

		      for(let i=0; i< productos.length; i++){
			    if (productos[i].id == idProducto) {
				      productoBuscado = productos[i];
				      break;
            }
          }
          res.render('products/productEdit', {productoAEditar: productoBuscado});
        },

        update: (req,res) => {
          let idProducto= req.params.id;
          
          for(let i=0; i< productos.length; i++){
            if (productos[i].id== idProducto) {
              
              productos[i].nombre= req.body.nombre;
              productos[i].precioActual= parseInt(req.body.precioActual);
              productos[i].descuento= parseInt(req.body.descuento);
              productos[i].categoria= req.body.categoria;
              productos[i].descripcion= req.body.descripcion;
              productos[i].estado= req.body.estado;
              productos[i].cuotas= parseInt(req.body.cuotas);
              break;
            }
          }
          fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
          
          res.redirect('/');
        
        },

  destroy: (req,res) => {
    db.Producto.destroy ({
      where: {
        id: req.params.id
      }
    })
    res.redirect('/');
  }       
,
  local: (req,res) => {
    db.Producto.findAll ()
      .then ((producto) => {
        return res.render('products/localProducts', {producto:producto});
      })
  }
};
      
module.exports = productsControllers;