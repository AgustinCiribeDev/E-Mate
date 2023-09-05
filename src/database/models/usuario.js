module.exports = function(sequelize, dataTypes){
	let alias = "Usuario"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        nombre:{ type:dataTypes.STRING },
        email:{	type:dataTypes.STRING },
        clave:{	type:dataTypes.STRING },
        rol:{ type:dataTypes.STRING },
        local_id:{ type: dataTypes.INTEGER },
		imagen:{ type:dataTypes.STRING },
		oferta:{ type:dataTypes.BOOLEAN }
	}

    let config = {
        tableName: "usuario",
        timestamps: false
    }

	let Usuario = sequelize.define(alias, cols, config);
	
	Usuario.associate = function(models){
        Usuario.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "usuario_id"
        });
		Usuario.belongsTo(models.Local, {
            as: "local",
            foreignKey: "local_id"
        })
		
	}

	return Usuario; 
}
