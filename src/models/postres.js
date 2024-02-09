const postre = (sequelize, type) => {
    return sequelize.define('postres', {
        idPostres: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: type.STRING,
        descripcion: type.STRING,
        precio: type.STRING,
        estado: type.STRING,

        crearPostres:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updatePostres: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = postre