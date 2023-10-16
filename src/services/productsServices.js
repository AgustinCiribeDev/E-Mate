const db = require('../database/models');                                        

 const productsServices = {  

   //ENDPONIT LISTADO PRODUCTOS

   index: async (req, res) => {
    try {
      let listaProductos = await db.Producto.findAll({
        include: [
            {
              model: db.Categoria,
              as: 'categoria',
              attributes: ['nombre']
            }
          ],
        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen', 'descuento', 'cuota', 'categoria_id'] 

      });     
      
      const count = listaProductos.length;
  
      const countByCategory = listaProductos.reduce((countByCategory, producto) => {
        const categoryName = producto.categoria.nombre;  
        countByCategory[categoryName] = (countByCategory[categoryName] || 0) + 1;
        return countByCategory;
      }, {});
  
      res.json({
        datosPedidos: 'Lista de Productos',
        codigo: 200,
        count: count,
        countByCategory: countByCategory,
        products: listaProductos,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  categorias: async (req, res) => {
    try {
      let listaCategorias = await db.Categoria.findAll({
      });

      const count = listaCategorias.length;

      res.json({
        datosPedidos: 'Total de Categorias',
        codigo: 200,
        count: count,
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las Categorias' });
    }
  },

  productoId: async (req, res) => {         
    try {
      let pedidoProducto = await db.Producto.findByPk(req.params.id, {
        include: [
            {
              model: db.Categoria,
              as: 'categoria',
              attributes: ['nombre']
            }
          ],
        attributes:  ['id', 'nombre', 'descripcion', 'precio', 'imagen', 'descuento', 'cuota', 'categoria_id' ]
      })

      res.json({
      datosPedidos: 'Producto por ID',
      codigo: 200,
      productoId: pedidoProducto,
    });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Productos' });
    }
  },

}
module.exports =   productsServices;
