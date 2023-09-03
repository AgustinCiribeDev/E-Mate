module.exports = function(sequelize, dataTypes){
	let alias = "usuario"     //como queremos que sequelize llame a nuestra tabla//
	
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
		ofertas:{ type:dataTypes.STRING },
	}

    let config = {
        tableName: "usuario",
        timestamps: false
    }

	let usuario = sequelize.define(alias, cols, config);
	
	usuario.associate = function(models){
        usuario.hasMany(models.producto, {
            as: "productos",
            foreignKey: "usuario_id"
        });
		usuario.belongsTo(models.local, {
            as: "local",
            foreignKey: "local_id"
        })
		
	}

	return usuario; 
}
