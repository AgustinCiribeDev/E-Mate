const path = require('path');

// Configurando Multer
const multer = require('multer');
const upload = multer();

// Requiriendo express-validator
const { body } = require('express-validator');

// Validaciones
const validationsProducts= [
    body ('nombre').notEmpty().withMessage('Tienes que escribir el nombre del producto'),
    body ('categoria').notEmpty().withMessage('Tienes que elegir una categoría de producto'),
    body ('estado').notEmpty().withMessage('Tienes que elegir si el producto está en oferta o no'),
    body ('descripcion').notEmpty().withMessage('Tienes que describir tu producto'),
    body ('precio').notEmpty().withMessage('Falta el precio'),
    body ('stock').notEmpty().withMessage('Falta el stock'),
    body ('imagen').custom((value, {req}) => {
        let file = req.file;
        let extensionsAccepted = ['.jpg', '.png', '.gif', '.jpeg', '.webp'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!extensionsAccepted.includes(fileExtension)) {
                throw new Error(`Las extensiones permitidas son ${extensionsAccepted.join(', ')}`);
            }
        }
    return true;
    })
];

module.exports = validationsProducts;