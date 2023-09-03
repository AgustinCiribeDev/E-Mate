module.exports = function(sequelize, dataTypes){
	let alias = "local"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        nombre:{
			type:dataTypes.STRING
		},
        direccion:{
			type:dataTypes.STRING
		},
        telefono:{
			type:dataTypes.STRING
		},
	}

    let config = {
        tableName: "local",
        timestamps: false
    }

	let local = sequelize.define(alias, cols, config);
	
	local.associate = function(models){
        local.hasMany(models.usuario, {
            as: "usuarios",
            foreignKey: "usuario_id"
        })
		
	}

	return local; 
}

