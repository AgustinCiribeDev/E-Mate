module.exports = function(sequelize, dataTypes){
	let alias = "venta"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        monto_unidad:{
			type:dataTypes.FLOAT
		},
        cantidad:{
			type:dataTypes.INTEGER
		},
        producto_id:{
			type:dataTypes.INTEGER
		},
        registro_venta_id:{
			type:dataTypes.INTEGER
		},
	}

    let config = {
        tableName: "venta",
        timestamps: false
    }

	let venta = sequelize.define(alias, cols, config);
	
	venta.associate = function(models){
        venta.hasMany(models.Usuario, {
            as: "usuarios",
            foreignKey: "usuario_id"
        })
		
	}

	return venta; 
}

