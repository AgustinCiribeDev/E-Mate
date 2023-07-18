const fs = require('fs');

const usersControllers = {
        register: (req, res) => {
          res.render('usuarios/registro');
        },
        login: (req, res) => {
          res.render('usuarios/inicio');
        }
    }

    module.exports = usersControllers;