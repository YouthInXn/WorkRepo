
/* 一个简单的服务器	*/

var http = require('http');

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type':'text/html'});
	// Home
	if (req.url === '/') {
		res.end('<h1>Home</h1>');
	} else if (req.url === '/about') {
		res.end('<h2>About</h2>');
	} else {
		res.writeHead(404, {'Content-Type':'text/html'});
		res.end('<h2>404</h2>');
	}
}).listen(8080, "localhost");
console.log('Server is Running...');