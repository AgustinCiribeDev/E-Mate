const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const db = require('../database/models'); /* Base de Datos */

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
  }
}      
module.exports = mainControllers;  