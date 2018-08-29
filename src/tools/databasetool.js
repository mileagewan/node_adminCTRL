/*
这是执行数据库的方法
* */
const MongoClient = require('mongodb').MongoClient;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd21';

/**
 * 提取数据库连接代码
 */
// function link(collectionName, param) {
//     MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
//         const db = client.db(dbName);
//         const collection = db.collection(collectionName);
//
//
//     });
//
// }


/**
 * 查找一个一组数据
 * @param collectionName
 * @param param
 * @param callback
 */
exports.findList = (collectionName, param, callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(param).toArray((err, doc) => {
            callback(err, doc);
            client.close();
        });

    });
}

/**
 * 查找一个数据
 */
exports.findOne = (collectionName, param, callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.findOne(param, (err, doc) => {
            err ? (
                console.log(err)
            ) : (
                callback(err, doc),
                    client.close()
            );
        });

    });
}

/**
 * 增加多条数据
 */
exports.insertList = (collectionName, param, callback) => {
    // Use connect method to connect to the server
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertMany(param, (err, doc) => {
            err ? (
                console.log(err)
            ) : (
                callback(err, doc),
                    client.close()
            );
        });

    });
}

/**
 * 添加一条数据
 */
exports.insertOne = (collectionName, param, callback) => {
    MongoClient.connect(url, {useNewUrlParser: true}, function (err, client) {
        const db = client.db(dbName);
        const colletction = db.collection(collectionName);
        colletction.insertOne(param, (err, result) => {
            err ? (
                console.log(err)
            ) : (
                callback(err, result),
                    client.close()
            );

        });
    });
};





