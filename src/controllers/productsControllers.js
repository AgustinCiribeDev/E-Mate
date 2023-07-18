const fs = require('fs');
const path = require('path');
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
            imagen: req.body.imagen
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
        
        
        /*addProduct: (req, res) => {
          const newProduct = {
            id: req.body.id,
            nombre: req.body.nombre,
            precioActual: req.body.precioActual,
            categoria: req.body.categoria,
            descripcion: req.body.descripcion,
            cuotas: req.body.cuotas,
            estado: req.body.estado,
            descuento: req.body.descuento,
            imagen: req.body.imagen
          };
      
          // Leer el archivo JSON existente
          fs.readFile('src/database/productos.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al leer el archivo JSON' });
              return;
            }
      
            try {
              const productos = JSON.parse(data);
      
              // Agregar el nuevo producto al array existente
              productos.push(newProduct);
      
              // Convertir el array actualizado a JSON
              const updatedJson = JSON.stringify(productos, null, 2);
      
              // Escribir el JSON actualizado de vuelta al archivo
              fs.writeFile('src/database/productos.json', updatedJson, 'utf8', (err) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ error: 'Error al escribir en el archivo JSON' });
                  return;
                }
      
                res.render('products/productCatalogue', { productos });
              });
            } catch (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al analizar el JSON' });
            }
          });
        },
        products: (req, res) => {
          fs.readFile('src/database/productos.json', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al leer el archivo JSON' });
              return;
            }
      
            try {
              const productos = JSON.parse(data);
              res.render('products/productCatalogue', { productos });
            } catch (err) {
              console.error(err);
              res.status(500).json({ error: 'Error al analizar el JSON' });
            }
          });
        }*/
      };
      
      module.exports = productsControllers;