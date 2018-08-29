/**
 * 定义一个控制器,用来放置所有的方法
 */
const path = require('path');
/**
 * 引入操纵数据的第三方包
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'szhmqd21';
/**
 * 引入验证码的第三方包
 */
const captchapng = require('captchapng');






/**
 * 输出获取登录页面的数据
 */
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/html/login.html'));
}
/**
 * 输出注册页面的数据
 */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/html/register.html'));
}
/**
 * 输出注册的行为结果信息
 */
exports.doRegist = (req, res) => {
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('userInfo');

        //先查询是否存在存在该用户名
        collection.findOne({
            username: req.body.username
        }, function (err, doc) {
            if (doc) {
                console.log(doc);
                res.json({
                    status: 1,
                    message: '用户名已经存在'
                })
                client.close();
            } else {
                /**
                 * 当用户名不存在的时候,往数据库里面添加数据
                 */
                collection.insertOne({
                    username: req.body.username,
                    password: req.body.password
                }, function (err, result) {
                    console.log(result);
                    res.json({
                        status: 0,
                        message: '注册成功'
                    })
                    client.close();
                })


            }
        })

    });
}


/**
 * 输出获取验证码的方法
 */

exports.getVcode = (req, res) => {
    //将该验证码保存在变量中
    let vcodenum = parseInt(Math.random() * 9000 + 1000);
    /**
     * 将代码内容保存在session里面
     */
    req.session.vcodenum = vcodenum;




    let p = new captchapng(80, 30, vcodenum);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}



/**
 * 登录的行为判断
 */

exports.doLogin = (req, res) => {
    if (req.body.vcode != req.session.vcodenum) {
        //验证码不正确
        res.json({
            status: 1,
            message: '验证码不正确'
        })
    } else {
        /**
         *连接数据库
         */

        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            const db = client.db(dbName);
            const collection = db.collection('userInfo');

            //先查询是否存在存在该用户名
            collection.findOne({
                username: req.body.username,
                password: req.body.password
            }, function (err, doc) {
                if (doc) {
                    console.log(doc);
                    res.json({
                        status: 0,
                        message: '登录成功'
                    })
                    client.close();
                } else {
                    /**
                     * 当用户名不存在的时候,返回不存在
                     */
                    client.close();
                    res.json({
                        status: 1,
                        message: '用户名或者密码错误'
                    })



                }
            })

        });






    }
}