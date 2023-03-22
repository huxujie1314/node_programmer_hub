const mysql2 = require("mysql2");

// 1.创建连接池
const connectionPool = mysql2.createPool({
    host: "localhost",
    port: 3306,
    database: "coderhub",
    user: "root",
    password: "Zjcshxj@1314",
    connectionLimit: 6
})

// 2. 获取连接是否成功
connectionPool.getConnection((err,connection)=>{
    // 1. 判断是否有错误信息
    if(err){
        console.log("获取连接失败",err);
        return;
    }
    // 2. 测试连接
    connection.connect(err=>{
        if(err){
            console.log("测试连接失败",err);
        }else {
            console.log("测试连接成功");
        }
    })
})
// 3.获取连接池中连接对象(promise)
const connection = connectionPool.promise();

module.exports = connection;
