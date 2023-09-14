const path = require('path');

//Configurando Multer
const multer = require('multer');
const upload = multer();

// Requiriendo express-validator
const { body } = require('express-validator');

//Validaciones
const validationsUsers = [
    body ('name').notEmpty().withMessage('Tienes que escribir tu nombre'),
    body ('rol').notEmpty().withMessage('Tenés que elegir un rol'),
    body ('email')
    .notEmpty().withMessage('Tienes que escribir tu correo electrónico').bail()
    .isEmail().withMessage('Tienes que escribir un formato de correo válido'),
    body ('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body ('avatar').custom((value, {req}) => {
        let file = req.file;
        let extensionsAccepted = ['.jpg', '.png', '.gif', '.jpeg'];

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

module.exports = validationsUsers;