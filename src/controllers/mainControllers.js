const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../database/productos.json');
let productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainControllers = {
        index: (req, res) => {
          productos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
          let productosOferta = productos.filter(ofertas => ofertas.estado == "En Oferta");         
          res.render('index', {productosOferta});
          }
}      
module.exports = mainControllers;
    