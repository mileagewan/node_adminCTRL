
/*
* 这是学生的路由
* */

//需要引用过来
const path=require('path');
const express = require('express');
const studentRouter = express.Router();
/**
 * 引入控制器
 */
const studentCTRL = require(path.join(__dirname, '../controllers/studentController.js'));

/**
 * 路由进行监控
 */
studentRouter.get('/list', studentCTRL.getListPage);









/*
*输出路由
 */
module.exports = studentRouter;