const fs = require('fs');

const mainControllers = {
        index: (req, res) => {
          res.render('index');
        },
        register: (req, res) => {
          res.render('users/register');
        },
        login: (req, res) => {
          res.render('users/login');
        },
        product: (req, res) => {
          res.render('products/productDetail');
        },
        cart: (req, res) => {
          res.render('products/productCart');
        },
        create: (req, res) => {
          res.render('products/productCreate');
        },
        addproduct: (req, res) => {
          const newProduct = {
            id: req.body.id,
            nombre: req.body.nombre,
            precioActual: req.body.precioActual,
            descripcion: req.body.descripcion,
            cuotas: req.body.cuotas,
            precioAnterior: req.body.precioAnterior,
            estado: req.body.estado,
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
        }
      };
      
      module.exports = mainControllers;
      