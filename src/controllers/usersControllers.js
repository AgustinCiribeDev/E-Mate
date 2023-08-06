const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
  cloud_name: 'dirx4wkl1',
  api_key: '723134683983768',
  api_secret: 'vTNJrOTeoaJA1vYQaNwNKdWI0SI',
});

const usuariosFilePath = path.join(__dirname, '../database/usuarios.json');
let usuarios = [];

const usersControllers = {
  register: (req, res) => {
    res.render('usuarios/registro');
  },

  addUser: (req, res) => {
    console.log(req.file);
   
    const imageBuffer = req.file.buffer;
    const nombreImagen = Date.now() + req.file.originalname;

    const stream = cloudinary.uploader.upload_stream({
      resource_type: 'imagen',
      public_id: cloudinary.random_public_id(),
    }, (error, result) => {
      if (error) {
        console.log('Error al cargar la imagen:', error);
        res.status(500).send('Error al cargar la imagen');
      } else {
        console.log('Imagen cargada correctamente:', result);

        // Aquí, almacenamos la URL completa de Cloudinary en el objeto del nuevo producto
        let idNuevoUsuario = (usuarios[usuarios.length - 1] || { id: 0 }).id + 1;
        let objNuevoUsuario = {
          id: idNuevoUsuario,
          nombre: req.body.nombre,
          email: req.body.email,
          password: req.body.password,
          imagen: result.secure_url
        };

        usuarios.push(objNuevoUsuario);
        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, ' '));

        res.redirect('/');
      }
    });

    streamifier.createReadStream(imageBuffer).pipe(stream);
  },
  

  login: (req, res) => {
    res.render('usuarios/inicio');
  }
};

module.exports = usersControllers;