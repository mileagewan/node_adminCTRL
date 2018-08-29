/**
 * 引包,开启服务
 */
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

/**
 * 将路由引用过来
 */
const accountRouter = require(path.join(__dirname, './router/accountRouter.js'));


//app需要使用一个post中间件来处理post请求
app.use(bodyParser.urlencoded({
    extended: true
}));
//app使用一个中间件
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))

//使用路由,如果是二级目录是account,name就交个account路由处理

app.use('/account', accountRouter);











app.listen(3000, "127.0.0.1", err => {
    err ? console.log(err) : console.log('server start ok');
})