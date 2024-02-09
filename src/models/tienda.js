const tienda = (sequelize,type)=>{
    return sequelize.define('restaurantes', {
        idRestaurante: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        restaurantName: type.STRING(20),
        location: type.STRING(30),
        imageRestaurant: type.STRING,
        tipoComida: type.STRING,
        
        crearRestaurante:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateRestaurante: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })

}
module.exports = tienda