

/* 用NodeJS的fs模块实现文件复制 */

var fs = require('fs');
var path = require('path')

// 创建一个可读流
var rs = fs.createReadStream(path.join(__dirname, 'index.html'), 'utf-8');
// 创建一个可写流
var ws = fs.createWriteStream(path.join(__dirname, 'index_copy.html'), 'utf-8');

rs.on('error', function (error) {
	console.log(error);
});
rs.on('data', function () {
	console.log('开始复制文件..');
});
rs.on('end', function () {
	console.log('复制完毕！');
	ws.end();
	console.log('目标可写流已关闭！')
});

ws.on('error', function (error) {
	console.log(error);
});
ws.on('pipe', function () {
	console.log('正在连通可写流管道..');
});

// 将可读流的内容导向可写流 实现文件复制
rs.pipe(ws, { end:false });

