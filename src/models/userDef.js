import Sequelize from 'sequelize'
export default {
    id: {
        type: Sequelize.STRING,
        field: 'user_id',
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        field: 'user_name'
    },
    password: {
        type: Sequelize.STRING,
        field: 'user_pwd'
    }
}