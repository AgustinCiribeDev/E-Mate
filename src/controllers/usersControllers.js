const fs = require('fs');
const { validationResult } = require('express-validator');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { Op } = require('sequelize');
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
  //METODOS DEL LOGIN:
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
        }console.log('este usuario esta logueado ' + res.locals.isLogged);
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
  },

  register: (req, res) => {          // METODO OK
    
    const localAdministrador = res.locals.userLogged.local_id
    
    db.Usuario.findAll({
      where: {
        local_id: localAdministrador
      }
    })
      .then (function (usuario){
        res.render('usuarios/registro', { usuario: usuario });      //Comparto los datos del modelo que quiero moestrar en la vista
      })
  },

  processRegister: async (req, res) => {     //si cargo la foto anda, sino tira error
    
    let resultValidation = validationResult(req);
    let usuarios = await db.Usuario.findAll();

    if(resultValidation.errors.length > 0) {
      return res.render('usuarios/registro', {
        usuario: usuarios,
        errors: resultValidation.mapped(),
        oldData: req.body,
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
        oldData: req.body,
        usuario: usuarios
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

    const localAdministrador = res.locals.userLogged.local_id
    
    
    let pedidoListado = db.Usuario.findAll({
      where: {
        local_id: localAdministrador
      }
    })
    let id = req.params.id;

    Promise.all([pedidoUsuario, pedidoListado])
      .then (function ([usuarioEditar, usuario]){
        res.render('usuarios/editUser', {usuarioEditar:usuarioEditar, usuario:usuario, id});      //Comparto los datos del modelo que quiero moestrar en la vista
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(500).send('Error interno del servidor');
      });
  },
  
  processEditUser: async function (req, res) {

    //Aca se realizan las validaciones del back.
    let resultValidation = validationResult(req);
  
    if(resultValidation.errors.length > 0) {        //Si hay errores se manda una vista con los mismos.
      let usuario = await db.Usuario.findAll();
      let usuarioEditar = await db.Usuario.findByPk(req.params.id)
      return res.render('usuarios/editUser', {
        usuario: usuario,
        usuarioEditar: usuarioEditar,
        errors: resultValidation.mapped(),
        oldData: req.body,
      });
    }else{                                          //Si no hay errores continua el proceso de Edición
    
    // 2°Validación: Antes de editar el usuario validamos que el email enviado no este registrado.
  
    let usuarioEditar = await db.Usuario.findByPk(req.params.id);
    
    let usuarioExceptoEditar = await db.Usuario.findOne ({
       where : {
          email: req.body.email,
          id: {[Op.not]: req.params.id},
        } 
      }) ;
    
    if (usuarioExceptoEditar) {               //Si se encontro un usuario con el mismo email ingresado sale el error, sino continua.
      let usuario = await db.Usuario.findAll();
      
      return res.render('usuarios/editUser', {
        errors: {
          email: {
            msg: 'Este email ya está registrado'
          }
        },
        usuario:usuario,
        oldData: req.body,
        usuarioEditar: usuarioEditar
      });
    }
    
    // 3° Validación: Si viene una imagen por el req.file se guarda la imagen en el Buffer y continua con la edición.
    
    if(req.file){
    const imageBuffer = req.file.buffer;
    const nombreImagen = Date.now() + req.file.originalname; 
     
    const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', public_id: nombreImagen }, (error, result) => {
    if (error) {                    // Si hay error se envia el msj.
      console.log('Error al cargar la imagen:', error);
      res.status(500).send('Error al cargar la imagen');
    } else {                        // Si no hay error se continua con el proceso de edición
      console.log('Imagen cargada correctamente:', result); // Aquí, en lugar de almacenar solo el nombre de la imagen,
    
        // editando el usuario
      db.Usuario.update({
        nombre: req.body.name,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password,10 ), // hasheando el password
        rol: req.body.rol,
        local_id: req.body.local_id,
        imagen: result ? result.secure_url : null, // Almacenamos la URL completa de Cloudinary si result está definido, de lo contrario, usamos null // 
      }, {where: {
        id: req.params.id
      }})
      .then((resultados)  => { 
        res.redirect('/users/register');
      })
      .catch((error) => {
        console.error(error)
      });
          }
    });
        
    streamifier.createReadStream(imageBuffer).pipe(stream);
    
    //Si el usuario no quiere editar la imagen se editan todos los campos menos ese.
  
  }else{
    await db.Usuario.update({
      nombre: req.body.name,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password,10 ), // hasheando el password
      rol: req.body.rol,
      local_id: req.body.local_id,
    }, {where: {
      id: req.params.id
    }})
    .then((resultados)  => { 
      res.redirect('/users/register');
    })
    .catch((error) => {
      console.error(error)
    });
  }
}
},
  
destroy: async (req,res) => {
    console.log("Hola")
    let usuarioBorrar = req.params.id
    await db.Usuario.destroy ({
      where: {
        id: usuarioBorrar
      }
    })
    res.redirect('/users/register');
  },

}

module.exports = usersControllers;                                           //0 