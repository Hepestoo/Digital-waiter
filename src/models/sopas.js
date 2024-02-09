const sopa = (sequelize, type) => {
    return sequelize.define('sopas', {
        idSopa: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        descripcion: type.STRING,
        precio: type.STRING,
        estado: type.STRING,

        crearSopa:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateSopa: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = sopa