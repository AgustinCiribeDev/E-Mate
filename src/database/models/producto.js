module.exports = function(sequelize, dataTypes){
	let alias = "Producto"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        nombre:{type:dataTypes.STRING},
        descripcion:{type:dataTypes.STRING},
        precio:{type:dataTypes.INTEGER},
        imagen:{type:dataTypes.STRING},
        stock:{type: dataTypes.INTEGER},
        estado:{type: dataTypes.STRING},
        descuento:{type: dataTypes.INTEGER},
        cuota:{type: dataTypes.STRING},
        fecha_creacion:{type:dataTypes.DATE},
        fecha_eliminacion:{type:dataTypes.DATE},
        usuario_id:{type: dataTypes.INTEGER},
        categoria_id:{type: dataTypes.INTEGER}
	}

    let config = {
        tableName: "producto",
        timestamps: false
    }

	let Producto = sequelize.define(alias, cols, config);
	
	Producto.associate = function(models){
        Producto.hasMany(models.Venta, {
            as: "ventas",
            foreignKey: "producto_id"
        });

		Producto.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "usuario_id"
        });
	
        Producto.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "categoria_id"
        })
	}

	return Producto; 
}

