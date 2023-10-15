const { Usuario } = require('../database/models');

// Función para obtener todos los usuarios
async function getUsers() {
  try {
    const usuarios = await Usuario.findAll();
    const listaUsuarios = usuarios.map(usuario => usuario.toJSON());
    return listaUsuarios;
  } catch (error) {
    throw new Error('Error al obtener los usuarios');
  }
}

module.exports = {
  getUsers,
};
