const express = require('express');
const router = express.Router();
const path = require('path');
const usersControllers = require('./../controllers/usersControllers');

const validationsUsers = require ('./../middlewares/validationsUsers')

//Configurando Multer
const multer = require('multer');
const upload = multer();

//Registro de usuario agregando una imagen como avatar

router.get('/register', usersControllers.register);
router.post('/register', upload.single('avatar'), validationsUsers, usersControllers.processRegister);

router.get('/login', usersControllers.login);

module.exports = router;

