const entrada = (sequelize, type) => {
    return sequelize.define('entradas', {
        idEntrada: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        descripcion: type.STRING,
        precio: type.STRING,
        estado: type.STRING,

        crearEntrada:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateEntrada: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = entrada