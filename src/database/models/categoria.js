module.exports = function(sequelize, dataTypes){
	let alias = "categoria"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        nombre:{
			type:dataTypes.STRING
		},
	}

    let config = {
        tableName: "categoria",
        timestamps: false
    }

	let categoria = sequelize.define(alias, cols, config);
	
	categoria.associate = function(models){
        categoria.hasMany(models.producto, {
            as: "productos",
            foreignKey: "categoria_id"
        })
		
	}

	return categoria; 
}

