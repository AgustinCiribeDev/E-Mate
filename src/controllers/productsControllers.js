const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({ 
    cloud_name: 'dirx4wkl1', 
    api_key: '723134683983768', 
    api_secret: 'vTNJrOTeoaJA1vYQaNwNKdWI0SI',
  });
  
  const productsFilePath = path.join(__dirname, '../database/productos.json');
  let productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


  const productsControllers = {
        index: (req,res) => {
          productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
          let productosOferta = productos.filter(ofertas => ofertas.estado == "En Oferta");
          
          res.render('index', {productosOferta});
        },
  
  
        productCatalogue: (req,res)=>{
          productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
          res.render('products/productCatalogue', {productos});
        },
  
        productDetail: (req, res) => {
          let idProducto= req.params.id;
		      let productoBuscado;

		      for(let i=0; i< productos.length; i++){
			    if (productos[i].id == idProducto) {
				      productoBuscado = productos[i];
				      break;
            }
          }
          res.render('products/productDetail', {producto: productoBuscado});
        },
        
        cart: (req, res) => {
          res.render('products/productCart');
        },
        
        //Editar Productos
        edit: (req, res) => {
          res.render('products/productEdit');
        },
        
        // Crear producto
        create: (req, res) => {
          res.render('products/productCreate');
        },
        addProduct: (req, res) => {
		      const imageBuffer = req.file.buffer;
          const nombreImagen = Date.now() + req.file.originalname;

          const stream = cloudinary.uploader.upload_stream({resource_type: 'image', public_id: nombreImagen}, (error, result) => {
             if (error) {
               console.log('Error al cargar la imagen:', error);
             } else {
               console.log('Imagen cargada correctamente:', result);
               }
           });
           streamifier.createReadStream(imageBuffer).pipe(stream);
          
          let idNuevoProducto= (productos[productos.length-1].id)+1;
          let objNuevoProducto= {
            id: idNuevoProducto,
            nombre: req.body.nombre,
            precioActual: parseInt(req.body.precioActual),
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            cuotas: parseInt(req.body.cuotas),
            estado: req.body.estado,
            descuento: parseInt(req.body.descuento),
            imagen: "https://res.cloudinary.com/dirx4wkl1/image/upload/" + nombreImagen
          };
        
          productos.push(objNuevoProducto);
          fs.writeFileSync(productsFilePath, JSON.stringify(productos, null, ' '));
          
          res.redirect('/');
        
        },
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
          let idProducto= req.params.id;

		      let nuevoArregloProductos = productos.filter (function(e){
			    return e.id != idProducto;
		      });
		      fs.writeFileSync(productsFilePath, JSON.stringify(nuevoArregloProductos, null, ' '));
		      
          res.redirect('/');
        }
        
      };
      
      module.exports = productsControllers;