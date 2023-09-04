module.exports = function(sequelize, dataTypes){
	let alias = "Venta"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        monto_unidad:{type:dataTypes.FLOAT},
        cantidad:{type:dataTypes.INTEGER},
        producto_id:{type:dataTypes.INTEGER},
        registro_venta_id:{type:dataTypes.INTEGER},
	}

    let config = {
        tableName: "venta",
        timestamps: false
    }

	let Venta = sequelize.define(alias, cols, config);
	
	Venta.associate = function(models){
        Venta.belongsTo(models.Producto, {
            as: "producto",
            foreignKey: "producto_id"
        });
		Venta.belongsTo(models.Registro_venta, {
            as: "registro_venta",
            foreignKey: "registro_venta_id"
        });
		
	}

	return Venta; 
}


