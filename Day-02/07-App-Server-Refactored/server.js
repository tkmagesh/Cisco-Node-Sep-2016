var http = require('http');
	

var dataParser = require('./dataParser'),
	serveStatic = require('./serveStatic'),
	calculatorHandler = require('./calculatorHandler'),
	notFoundHandler = require('./notFoundHandler');

var server = http.createServer(function(req,res){
	
	dataParser(req);
	console.log(req.method + '\t' + req.urlData.pathname);
	serveStatic(req, res);
	calculatorHandler(req, res);
	notFoundHandler(req, res);
});

server.listen(8080);

console.log("Server listening on port 8080!!");
