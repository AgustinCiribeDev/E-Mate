const express = require('express');                                         //0
const router = express.Router();                                            //0
const path = require('path');
const usersControllers = require('./../controllers/usersControllers');        

const validationsUsers = require ('./../middlewares/validationsUsers')
const validationsLogin = require ('./../middlewares/validationsLogin')
const guestMiddleware = require ('./../middlewares/guestMiddleware')
const authMiddleware = require ('./../middlewares/authMiddleware')

//Configurando Multer
const multer = require('multer');
const upload = multer();

//Registro de usuario agregando una imagen como avatar

router.get('/register', guestMiddleware, usersControllers.register);                   //0
router.post('/register', upload.single('avatar'), validationsUsers, usersControllers.processRegister);
router.get('/editUser/:id', usersControllers.editUser);  
router.post('/editUser/:id', usersControllers.processEditUser);  


router.get('/login', guestMiddleware, usersControllers.login);
router.post('/login', validationsLogin, usersControllers.loginProcess)

router.get('/profile', authMiddleware, usersControllers.profile);

router.get('/logout', usersControllers.logout);

module.exports = router;

