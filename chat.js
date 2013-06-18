var http = require('http'),
	url = require('url'),
	fs = require('fs');

var messages = ['testing'];
var clients = [];

http.createServer(function(req, res) {
	// Parse URL
	var urlParts = url.parse(req.url);
	console.log(urlParts);

	if ( urlParts.pathname === '/' ) {
		// File serving
		fs.readFile('./index.html', function(err, data) {
			res.end(data);
		});
	} else if ( urlParts.pathname.substring(0,5) === '/poll') {
		// Polling code here
		var count = urlParts.pathname.replace(/[^0-9]*/, '');
		console.log(count);

		if ( messages.length > count ) {
			res.end(JSON.stringify({
				count: messages.length,
				append: messages.slice(count).join('\n')+'\n'
			}));
		} else {
			clients.push(res);
		}
	} else if ( urlParts.pathname.substring(0,5) === '/msg/' ) {
		// Message receiving
		var msg = unescape(urlParts.pathname.substr(5));
		messages.push(msg);

		while(clients.length > 0) {
			var client = clients.pop();
			client.end(JSON.stringify({
				count: messages.length,
				append: msg+'\n'
			}));
		}

		res.end();
	}
}).listen(8080, 'localhost');

console.log('Server is running');