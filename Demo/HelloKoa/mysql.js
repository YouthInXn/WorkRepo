
// 获取驱动
const mysql = require('mysql');

// 创建链接

const connection = mysql.createConnection({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'mysql',
    database:'test'
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('connected as id ' + connection.threadId);
    }
});

connection.query('select * from test1', function (err, rows, fields) {
    if (err) {
        console.log(err);
    } else {
        console.log('查询成功！');
        console.log('rows:'+JSON.stringify(rows));
        console.log('fields:'+JSON.stringify(fields));
    }
});