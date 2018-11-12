

/* 最基本的Http服务器创建 */

var http = require('http');

http.createServer(function (request, response) {
	response.writeHead(200, {'Content-Type':'text/plain' });
	response.write("Hello NodeJS!");
	response.end();
}).listen(8080);
console.log('Server is Running at http://localhost:8080 ...');
