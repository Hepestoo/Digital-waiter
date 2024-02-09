const metodo = (sequelize, type) => {
    return sequelize.define('metodos', {
        idMetodo: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        metodoPago: type.STRING,
        estado: type.STRING,

        crearMetodo:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateMetodo: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = metodo