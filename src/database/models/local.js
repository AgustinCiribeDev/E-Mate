module.exports = function(sequelize, dataTypes){
	let alias = "Local"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        nombre:{type:dataTypes.STRING},
        direccion:{type:dataTypes.STRING},
        ciudad:{type:dataTypes.STRING},
        telefono:{type:dataTypes.STRING}
	}

    let config = {
        tableName: "local",
        timestamps: false
    }

	let Local = sequelize.define(alias, cols, config);
	
	Local.associate = function(models){
        Local.hasMany(models.Usuario, {
            as: "usuarios",
            foreignKey: "local_id"
        })
		
	}

	return Local; 
}

