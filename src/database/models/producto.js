module.exports = function(sequelize, dataTypes){
	let alias = "producto"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        nombre:{
			type:dataTypes.STRING
		},
        descripcion:{
			type:dataTypes.STRING
		},
        precio:{
			type:dataTypes.FLOAT
		},
        fecha_creacion:{
			type:dataTypes.DATE
		},
        fecha_eliminacion:{
			type:dataTypes.DATE
		},
        imagen:{
			type:dataTypes.STRING
		},
        stock:{
			type: dataTypes.INTEGER
		},
        usuario_id:{
			type: dataTypes.INTEGER
		},
        categoria_id:{
			type: dataTypes.INTEGER
		},
	}

    let config = {
        tableName: "producto",
        timestamps: false
    }

	let producto = sequelize.define(alias, cols, config);
	
	producto.associate = function(models){
        producto.hasMany(models.Venta, {
            as: "ventas",
            foreignKey: "producto_id"
        })
	}

	return producto; 
}

