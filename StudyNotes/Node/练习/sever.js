var http = require('http');

const httpServer = http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	res.write('<h1>Hello NodeJS!</h1>');
	res.end('<p>server is running...</p>');
}).listen(3001);
httpServer.on('request', function (req, res) {
	console.log('请求来了:' + req);
});
httpServer.on('connection', function (socket) {
	console.log('已连接'+socket);
});
console.log("Http server is running at port 3001");