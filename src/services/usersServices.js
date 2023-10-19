 const db = require('../database/models');                                        

 const usersServices = {  

   //ENDPONIT LISTADO
  index: async (req, res) => {
    try {
      let listaUsuarios = await db.Usuario.findAll({
        attributes: ['id', 'nombre', 'email', 'rol', 'local_id', 'imagen'] 
      });

      const count = listaUsuarios.length;

      res.json({
        datosPedidos: 'Lista de Usuarios',
        codigo: 200,
        count: count,
        users: listaUsuarios,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  },


 //ENDPONIT USUSARIO DETERMINADO:

  usuarioId: async (req, res) => {         
    try {
      let pedidoUsuario = await db.Usuario.findByPk(req.params.id, {
        attributes: ['id', 'nombre', 'email', 'rol', 'local_id', 'imagen'] 
      })

      res.json({
      datosPedidos: 'Usuario por ID',
      codigo: 200,
      userId: pedidoUsuario,
    });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  }

  

}
module.exports =   usersServices;