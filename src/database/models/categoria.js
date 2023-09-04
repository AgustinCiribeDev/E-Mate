module.exports = function(sequelize, dataTypes){
	let alias = "Categoria"     //como queremos que sequelize llame a nuestra tabla//
	
	let cols = {    
		id:{
			type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
		},
        nombre:{type:dataTypes.STRING}
	}

    let config = {
        tableName: "categoria",
        timestamps: false
    }

	let Categoria = sequelize.define(alias, cols, config);
	
	Categoria.associate = function(models){
        Categoria.hasMany(models.Producto, {
            as: "productos",
            foreignKey: "categoria_id"
        })
		
	}
    
	return Categoria; 
}

