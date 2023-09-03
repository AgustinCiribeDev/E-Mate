module.exports = function(sequelize, dataTypes){
	let alias = "registro_venta"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        fecha:{
			type:dataTypes.DATE
		},
		direccion:{
			type:dataTypes.STRING
		},
		email:{
			type:dataTypes.STRING
		},
		dni:{
			type:dataTypes.STRING
		},
		medios_pago:{
			type:dataTypes.STRING
		},
	}

    let config = {
        tableName: "registro_venta",
        timestamps: false
    }

	let registro_venta = sequelize.define(alias, cols, config);
	
	registro_venta.associate = function(models){
        registro_venta.hasMany(models.Venta, {
            as: "ventas",
            foreignKey: "registro_venta_id"
        })
	}

	return registro_venta
}