const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
const bcryptjs = require('bcryptjs');

/*Requerimientos para guardar las imagenes de perfil*/
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const { log } = require('console');

cloudinary.config({ 
  cloud_name: 'dirx4wkl1', 
  api_key: '723134683983768', 
  api_secret: 'vTNJrOTeoaJA1vYQaNwNKdWI0SI',
});

/*Requerimientos para guardar la información de los usuarios en el json*/
// const usuariosFilePath = path.join(__dirname, '../database/usuarios.json');
// let usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

/*Base de Datos*/
const db = require('../database/models');                                        //0

const usersControllers = {                                                       //0
  register: (req, res) => {          // METODO OK
    db.Usuario.findAll()
      .then (function (usuario){
        res.render('usuarios/registro', { usuario: usuario });      //Comparto los datos del modelo que quiero moestrar en la vista
      })
  },

  processRegister: async (req, res) => {     //si cargo la foto anda, sino tira error
    
    const resultValidation = validationResult(req);
       
    if(resultValidation.errors.length > 0) {
      return res.render('usuarios/registro', {
        errors: resultValidation.mapped(),
        oldData: req.body
      });
    }
    
    // Antes de crear el usuario validamos que el usuario no este registrado con el mismo email.

    let userInDb = req.body.email
    let c = await db.Usuario.findOne ({
       where : {email: userInDb}
    }) 
    if (c) {
      return res.render('usuarios/registro', {
        errors: {
          email: {
            msg: 'Este email ya está registrado'
          }
        },
        oldData: req.body
      });
    }
    

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
        password: bcryptjs.hashSync(req.body.password,10 ), // hasheando el password
        rol: req.body.rol,
        local_id: req.body.local_id,
        imagen: result ? result.secure_url : null, // Almacenamos la URL completa de Cloudinary si result está definido, de lo contrario, usamos null // 
        oferta: req.body.oferta,
      })
      .then((resultados)  => { 
        res.redirect('/users/register');
      })
      .catch((error) => {
        console.error(error)
      });
          
      }
    });
        
    streamifier.createReadStream(imageBuffer).pipe(stream);
        
  },

  editUser: (req, res) => {          // EN PROCESO
    let pedidoUsuario = db.Usuario.findByPk(req.params.id)
    let pedidoListado = db.Usuario.findAll()

    Promise.all([pedidoUsuario, pedidoListado])
      .then (function ([usuarioEditar, usuario]){
        res.render('usuarios/editUser', { usuarioEditar:usuarioEditar , usuario:usuario });      //Comparto los datos del modelo que quiero moestrar en la vista
      })
  }
  ,
  processEditUser:  (req, res) => {   
    db.Usuario.update({
      nombre: req.body.name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password,10 ), // hasheando el password
      rol: req.body.rol,
      local_id: req.body.local_id,
      imagen: result ? result.secure_url : null, // Almacenamos la URL completa de Cloudinary si result está definido, de lo contrario, usamos null // 
      oferta: req.body.oferta,
    }, {
      where: {
        id: req.params.id
      }
    })
    .then((resultados)  => { 
      res.redirect('/users/register');
    })
    .catch((error) => {
      console.error(error)
    });
  } 
  ,
  login: async (req, res) => {
    try {
      return res.render('usuarios/inicio')
    } catch (error) {
          console.log (error.message);
      }
  },
        
  loginProcess: async (req, res) => {
      
     const resultValidation = validationResult(req);
       
      if(resultValidation.errors.length > 0) {
          return res.render('usuarios/inicio', {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
      }

      let userFound = await db.Usuario.findOne ({
        where : {email: req.body.email}
      });
      if (!userFound) {
        return res.render('usuarios/inicio', {
          errors: {
            email: {
            msg: 'Este email no está registrado'
            }
          }
        })
      };
     
      let passwordOk = bcryptjs.compareSync(req.body.password, userFound.password);

      console.log (passwordOk);

      if (passwordOk) {
        req.session.userLogged = userFound;
          if(req.body.remember_user) {
              res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60)*2 })
          }
        res.redirect('/users/profile');
      } else {
          return res.render('usuarios/inicio', {
            errors: {
              password: {
                msg: 'Contraseña incorrecta'
              }
            }
          })
        }
  },
  
  /*loginProcess: async (req, res) => {
    try {
      /*const resultValidation = validationResult(req);
       
      if(resultValidation.errors.length > 0) {
          return res.render('usuarios/inicio', {
            errors: resultValidation.mapped(),
            oldData: req.body
        });
      }

      // Antes de crear el usuario validamos que el usuario no este registrado con el mismo email.

      // validar lo que llega del formulario, email y password con algo como esto const resultValidation = validationResult(req);
      let userFound = await db.Usuario.findOne ({
        where : {email: req.body.email}
      })
      if (!userFound) {
        return res.render('usuarios/inicio', {
          errors: {
            email: {
            msg: 'Este email no está registrado'
            }
          }
        })
      }

      let passwordOk = bcryptjs.compareSync(req.body.password, userFound.password);

      if (passwordOk) {
        /*delete userFound.password
          req.session.userLogged = userFound;    // configura variable de sesión  userLogged  sobre el usuario que ha iniciado sesión.
            if(req.body.remember_user) {
              res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60)*2 })
              }
            return res.redirect('/users/profile');
      } else {
          return res.render('usuarios/inicio', {
            errors: {
              password: {
                msg: 'Contraseña incorrecta'
              }
            }
          })
        }
      }
        catch (error) {
          console.log (error.message);
          res.status(500).json({ message: 'Error en el servidor' });
        }
    },*/

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

module.exports = usersControllers;                                           //0 