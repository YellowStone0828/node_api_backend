
export let checkwinner = (ctx) =>{
    let currentUser = ctx.request.body.user
    if(currentUser&&currentUser.userName=='xin_liang'){
        ctx.body = {
            'result':'恭喜！您中奖了'
        }
    }else if(currentUser&&currentUser.userName!='xin_liang'){
        ctx.body = {
            'result':'真遗憾！感谢您的参与'
        }    
    }else{
        ctx.body = {
            'result':'相关信息缺失！请检查'
        }
    }
}

import sequelize from '../lib/sequelize'
import Sequelize from 'sequelize'
export let testDB = (ctx) =>{
    const User = sequelize.define('user',{
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
    }},{
        timestamps: false,
        tableName: 'ys_user_info',
        freezeTableName: true
      });

    User.findAll({
        attributes: ['id', 'name'],
        where:{
           user_name:ctx.request.body.user.userName 
        }
    }).then(user=>{
        console.log(user[0].dataValues);
    })
    // sequelize.query("SELECT * FROM ys_user_info").then(myTableRows => {
    //      console.log(myTableRows)
    // })
}