

/*	实现一个简单的文件服务器  */

var fs = require('fs');
var url = require('url');
var http = require('http');
var path = require('path');

var rootPath = path.resolve('.');
// console.log(rootPath);

var fileServer = http.createServer(function (request, response) {
	var pathname = url.parse(request.url).pathname;
	console.log('pathname:'+pathname);
	var filePath = path.join(rootPath, pathname);
	fs.stat(filePath, function (err, stats) {
		if (!err && stats.isFile()) {
			console.log('200:'+ request.url);
			response.writeHead(200);
			fs.createReadStream(filePath).pipe(response);
		} else {
			console.log('404:' + request.url);
			response.writeHead(404);
			response.end('404 Not Found.');
		}
	})
})
fileServer.listen(8080);

console.log('FileServer is Running..');
