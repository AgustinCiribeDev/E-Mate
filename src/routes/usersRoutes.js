const express = require('express');                                         //0
const router = express.Router();                                            //0
const path = require('path');
const usersControllers = require('./../controllers/usersControllers');        

const validationsUsers = require ('./../middlewares/validationsUsers');
const validationsEditUsers = require ('./../middlewares/validationsEditUsers');
const validationsLogin = require ('./../middlewares/validationsLogin');
const guestMiddleware = require ('./../middlewares/guestMiddleware');
const authMiddleware = require ('./../middlewares/authMiddleware');

//Configurando Multer
const multer = require('multer');
const upload = multer();

//Registro de usuario agregando una imagen como avatar
router.get('/register', usersControllers.register);                   //0 
router.post('/register', upload.single('avatar'), validationsUsers, usersControllers.processRegister);
router.get('/registerEdit', usersControllers.registerEdit);

//Editar Usuario
router.get('/editUser/:id', usersControllers.editUser);  
router.put('/editUser/:id', upload.single('avatar'), validationsEditUsers, usersControllers.processEditUser);  

//Borrar Usuario
router.delete('/delete/:id', usersControllers.destroy); 

router.get('/login', guestMiddleware, usersControllers.login);

router.post('/login', validationsLogin, usersControllers.loginProcess)

router.get('/profile', authMiddleware, usersControllers.profile);

router.get('/logout', usersControllers.logout);


  

module.exports = router;

