const express = require('express');
const router = express.Router();
const path = require('path');
const usersControllers = require('./../controllers/usersControllers');

const validationsUsers = require ('./../middlewares/validationsUsers')
const guestMiddleware = require ('./../middlewares/guestMiddleware')
const authMiddleware = require ('./../middlewares/authMiddleware')

//Configurando Multer
const multer = require('multer');
const upload = multer();

//Registro de usuario agregando una imagen como avatar

router.get('/register', guestMiddleware, usersControllers.register);
router.post('/register', upload.single('avatar'), validationsUsers, usersControllers.processRegister);

router.get('/login', guestMiddleware, usersControllers.login);
router.post('/login', usersControllers.loginProcess)

router.get('/profile', authMiddleware, usersControllers.profile);

router.get('/logout', usersControllers.logout);

module.exports = router;

