const express = require('express');
const router = express.Router();

const usersControllers = require('./../controllers/usersControllers');

//Configurando Multer
const multer = require('multer');
const upload = multer();


//Rutas de crear usuarios
router.get('/register', usersControllers.register);
router.post('/register', upload.single('imagen'), usersControllers.addUser);


router.get('/login', usersControllers.login);

module.exports = router;

