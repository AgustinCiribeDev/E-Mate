const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const db = require('../database/models'); /* Base de Datos */
const Sequelize = require('sequelize')

/* Credenciales de Cloudinary */
cloudinary.config({ 
    cloud_name: 'dirx4wkl1', 
    api_key: '723134683983768', 
    api_secret: 'vTNJrOTeoaJA1vYQaNwNKdWI0SI',
});
  
const mainControllers = {
  index: (req,res) => {
    db.Producto.findAll ({
      where: {estado: 'En Oferta'}
    })
    .then ((producto) => {
      return res.render('index', {producto:producto});
    })
  },
  search: async (req, res) => {
    const formControl = req.query.search;
    console.log(formControl);
    try {
      if (formControl) {
        const productos = await db.Producto.findAll({
          where: {
            nombre: {
              [Sequelize.Op.like]: `%${formControl}%`, // Búsqueda insensible a mayúsculas y minúsculas en MariaDB
            },
          },
        });
        res.render("products/productCatalogue", { productos, formControl });
      } else {
        const productos = await db.Producto.findAll();
        res.render("products/productCatalogue", { productos, formControl: "" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en la búsqueda");
    }
  }
}
      
module.exports = mainControllers;  