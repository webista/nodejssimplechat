var http = require('http'),
	url = require('url'),
	fs = require('fs');

var messages = ['testing'];
var clients = [];

http.createServer(function(req, res) {
	fs.readFile('./index.html', function(err, data) {
		res.end(data);
	});
}).listen(8080, 'localhost');

console.log('Server is running');