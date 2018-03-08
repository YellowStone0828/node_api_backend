import Sequelize from 'sequelize'

export let usrDefinition = {
    id: {
        type: Sequelize.STRING,
        field: 'USER_ID',
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        field: 'USER_NAME'
    },
    pwd: {
        type: Sequelize.STRING,
        field: 'USER_PASSWORD'
    }
}

export let usrDBconfig = {
    timestamps: false,
    tableName: 'r_pub_user',
    freezeTableName: true
}