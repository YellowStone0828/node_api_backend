
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
import userDef from '../models/index'
import sqlConfig from '../lib/sqlConfig'

export let testDB = (ctx) =>{
    const User = sequelize.define('user',userDef,sqlConfig);

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