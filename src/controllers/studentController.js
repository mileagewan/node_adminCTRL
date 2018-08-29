/**
 *
 */
const path = require('path');
/**
 * 引用模板引擎
 */
const xtpl = require('xtpl');


/*
* 引入databasetool里面的数据
*
* */
const databasetool = require('../tools/databasetool');
/**
 *
 * @param req
 * @param res
 */

exports.getListPage = (req, res) => {
    //获取到页面上的keyword
    const keyword = req.query.keyword || '';
    console.log(keyword);

    //获取到数据,返回学生的数据
    databasetool.findList('studentInfo', {name: {$regex: keyword}}, (err, docs) => {
        xtpl.renderFile(path.join(__dirname, '../statics/html/list.html'), {
            studentInfo: docs,
            keyword: keyword
        }, function (error, content) {
            res.send(content)
        });

    });


};


databasetool.findOne('studentInfo', {name: "刘德华"}, (err, doc) => {
    err ? (
        console.log(err)
    ) : (
        console.log(doc)
    );
});


// databasetool.insertList('studentInfo', [
//     {
//         name: "华仔",
//         age: 52,
//         sex: "男",
//         phone:13800138000
//     }, {
//         name: "郭富城",
//         age: 43,
//         sex: "男",
//         phone:13800138000
//     }
// ], (err, result) => {
//     err ? (
//         console.log(err)
//     ) : (
//         console.log(result)
//     );
// });


/**
 * 执行添加一条数据
 */

// databasetool.insertOne('studentInfo', {
//     name: "王菲",
//     age: "45",
//     sex: "女",
//     phone: 13800143800
// }, (err, result) => {
//     err ? (
//         console.log(err)
//     ) : (
//         console.log(result)
//     );
// });






