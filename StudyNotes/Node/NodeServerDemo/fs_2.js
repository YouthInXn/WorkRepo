

/* 读取文件信息 */

var fs = require('fs');
var path = require('path');
// 异步
fs.stat(path.resolve('.', 'index.html'), function (err, stat) {
	if (err) {
		console.log('err:' + err);
	} else {
		console.log('创建时间：' + stat.birthtime);
		console.log('文件大小：' + stat.size);
		console.log('最后一次修改：' + stat.mtime);
	}
})