
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
import modelDef from '../models/index'

export let testDB = (ctx) =>{
    //console.log(modelDef.userDef)
    //console.log(sqlConfig)
    const User = sequelize.define('user',modelDef.userDef.usrDefinition,modelDef.userDef.usrDBconfig);

    User.findAll({
        attributes: ['id', 'name', 'pwd'],
        where:{
           USER_NAME:ctx.request.body.user.userName 
        }
    }).then(user=>{
        //console.log(ctx)
        console.log(user[0].dataValues.id)
        ctx.body = {
            "success":user[0].dataValues.id
        }
    })
    // sequelize.query("SELECT * FROM ys_user_info").then(myTableRows => {
    //      console.log(myTableRows)
    // })
}