const path = require('path');

//Configurando Multer
const multer = require('multer');
const upload = multer();

// Requiriendo express-validator
const { body } = require('express-validator');

//Validaciones
const validationsLogin = [
    body ('email')
    .notEmpty().withMessage('Tienes que escribir tu correo electrónico').bail()
    .isEmail().withMessage('Tienes que escribir un formato de correo válido'),
    body ('password').notEmpty().withMessage('Tienes que escribir una contraseña')
];

module.exports = validationsLogin;