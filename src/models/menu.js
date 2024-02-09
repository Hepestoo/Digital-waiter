const menu = (sequelize, type) => {
    return sequelize.define('menus', {
        idMenu: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombreMenu: type.STRING,
        precioMenu: type.STRING,
        categoria: type.STRING,
        imageMenu: type.STRING,

        crearMenu:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        updateGerente: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false
    })
}

module.exports = menu