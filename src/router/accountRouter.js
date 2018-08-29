const express=require('express');
const path=require('path');



const accountRouter=express.Router();
/**
 * 引入控制器
 */

const accountCtrl=require(path.join(__dirname,'../controllers/accountController.js'));

/**
 * 路由来处理发过来的登录的页面的信息
 */
accountRouter.get('/login',accountCtrl.getLoginPage);
/**
 * 路由处理发过来的注册页面的信息
 */
accountRouter.get('/register',accountCtrl.getRegisterPage);
/**
 * 路由处理发过来的注册ajax信息
 */
accountRouter.post('/register',accountCtrl.doRegist);

/**
 * 路由处理验证请求刷新的信息
 */
accountRouter.get('/vcode',accountCtrl.getVcode);

/***
 * 路由器处理post登录
 */
accountRouter.post('/login',accountCtrl.doLogin);












/**
 * 导出路由
 */
module.exports=accountRouter;
