//Requerimientos para guardar la información de los usuarios en el json
const fs = require('fs');
const path = require('path');

const db = require('../database/models');

function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = false;
    if (req.cookies.userEmail != undefined){

        let emailInCookie = req.cookies.userEmail;
        console.log(emailInCookie);
    

    db.Usuario
              .findOne({
                  where: {email: emailInCookie}
              })
              .then(function(userFound) {
                  if (req.session) {
                      req.session.userLogged = userFound;
                  }
              }) 
    
    }
    if(req.session && req.session.userLogged){
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
  }
  next();
}

/*Requerimientos para guardar la información de los usuarios en el json
const fs = require('fs');
const path = require('path');
const usuariosFilePath = path.join(__dirname, '../database/usuarios.json');
let usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

function userLoggedMiddleware (req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    console.log(emailInCookie);
    let userFromCookie = null;

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === emailInCookie) {
        userFromCookie = usuarios[i];
        break; // No necesitamos seguir buscando si encontramos al usuario
      }
    }
    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    }

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }
   

   
    next();
}


module.exports = userLoggedMiddleware;*/


module.exports = userLoggedMiddleware;