const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
const bcryptjs = require('bcryptjs');

//Requerimientos para guardar las imagenes de perfil
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { log } = require('console');

cloudinary.config({ 
  cloud_name: 'dirx4wkl1', 
  api_key: '723134683983768', 
  api_secret: 'vTNJrOTeoaJA1vYQaNwNKdWI0SI',
});

//Requerimientos para guardar la información de los usuarios en el json
const usuariosFilePath = path.join(__dirname, '../database/usuarios.json');
let usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

//Base de Datos
const db = require('../database/models');

const usersControllers = {
        register: (req, res) => {
          res.render('usuarios/registro');
        },
        processRegister: (req, res) => {
        const resultValidation = validationResult(req);
       
        if(resultValidation.errors.length > 0) {
          return res.render('usuarios/registro', {
          errors: resultValidation.mapped(),
          oldData: req.body
        });
        }
        // Antes de crear el usuario validamos que el usuario no este registrado con el mismo email.

        let userInDb = req.body.email
        db.Usuario.findOne ({
          where : {email: userInDb}
        }).then ((email) => {
          if (email) {
            return res.render('usuarios/registro', {
              errors: {
                email: {
                  msg: 'Este email ya está registrado'
                }
              },
              oldData: req.body
            });
          }
        }).catch ((error) => {
          console.log (error);
        })


        // Aca comienza la creacion del usuario y el guardado de la imagen en cloudinary
        
        const imageBuffer = req.file.buffer;
        const nombreImagen = Date.now() + req.file.originalname;
        
        const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: nombreImagen }, (error, result) => {
            if (error) {
              console.log('Error al cargar la imagen:', error);
              res.status(500).send('Error al cargar la imagen');
            } else {
              console.log('Imagen cargada correctamente:', result);
              // Aquí, en lugar de almacenar solo el nombre de la imagen,
              // almacenamos la URL completa de Cloudinary en el objeto del nuevo producto
              
              
               // creando el objeto nuevo usuario
              db.Usuario.create({
                nombre: req.body.name,
                email: req.body.email,
                clave: bcryptjs.hashSync(req.body.password,10 ),    // hasheando el password
                rol: req.body.rol,
                local_id: req.body.local_id,
                imagen: result ? result.secure_url : null, // Almacenamos la URL completa de Cloudinary si result está definido, de lo contrario, usamos null // 
                oferta: req.body.oferta,
              })
              .then((resultados)  => { 
                res.redirect('/users/profile');
               })
              .catch((error) => {
                console.error(error)});
        
            }
          });
        
          streamifier.createReadStream(imageBuffer).pipe(stream);
        
        },
        
        
        login: (req, res) => {

          res.render('usuarios/inicio');
        },
        
        loginProcess: (req, res) => {
          let userLogin = req.body.email;
          let userFound = null;

          for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email === userLogin) {
              userFound = usuarios[i];
              break; // No necesitamos seguir buscando si encontramos al usuario
            }
          }

          if (userFound) {
          let passwordOk = bcryptjs.compareSync(req.body.password, userFound.password);
    
          if (passwordOk) {
            let userDeletePassword = { ...userFound}; //crea una copia del objeto userFound sin la propiedad password
            delete userDeletePassword.password;
            
            req.session.userLogged = userDeletePassword;
            
            if(req.body.remember_user) {
              res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60)*2 })
            }
            
            return res.redirect('/users/profile');
          
          } 
          
          else {
            return res.render('usuarios/inicio', {
                errors: {
                email: {
                msg: 'Contraseña incorrecta'
              }
            },
          });
          }
         } else {
            return res.render('usuarios/inicio', {
                errors: {
                email: {
                msg: 'Este email no está registrado'
              }
            },
          });
        }
  },
      profile: (req, res) => {
console.log(req.cookies.userEmail);
        res.render('usuarios/perfil', {
          user: req.session.userLogged
        });
      },

      logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        res.redirect('/');
      }
}

    module.exports = usersControllers;
