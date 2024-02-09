const cliente=(sequelize,type)=>{
    return sequelize.define('gerentes', {
        idGerente: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullname: type.STRING,
        username: type.STRING,
        email: type.STRING,
        password: type.STRING,
        
        crearGerente:{
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
module.exports = cliente