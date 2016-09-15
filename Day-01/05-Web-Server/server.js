var http = require('http'),
	path = require('path'),
	fs = require('fs');

var server = http.createServer(function(req,res){
	console.log('A new connection is established - ', req.url);
	var resourcePath = path.join(__dirname, req.url);
	if (!fs.existsSync(resourcePath)){
		res.statusCode = 404;
		res.end();
		return;
	}
	fs.createReadStream(resourcePath, {encoding : 'utf8'}).pipe(res);
});

server.listen(8080);

console.log("Server listening on port 8080!!");
