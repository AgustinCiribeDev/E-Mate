//Requerimientos para guardar la información de los usuarios en el json
const fs = require('fs');
const path = require('path');

const db = require('../database/models');

function userLoggedMiddleware (req, res, next){
    if (req.cookies.userEmail != undefined){

    let emailInCookie = req.cookies.userEmail;
    console.log(emailInCookie);
    

    db.Usuario.findOne({
    where: {email: emailInCookie}
   })
    .then(function(userFound) {
      if (req.session) {
        req.session.userLogged = userFound;
      }
  }) 
    
  }
  next();
}




module.exports = userLoggedMiddleware;