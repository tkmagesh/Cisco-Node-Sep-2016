var http = require('http'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	fs = require('fs');

var calculator = require('./calculator');

var staticResExtns = ['.html', '.css', '.js', '.jpg','.png','.xml','.json','.txt'];

function isStatic(resourcePath){
	return staticResExtns.indexOf(path.extname(resourcePath)) !== -1;
}

//dataParser
//serveStatic
//calculatorHandler
//notFoundHandler

var server = http.createServer(function(req,res){
	
	var parsedUrl = url.parse(req.url === '/' ? '/index.html' : req.url);
	console.log(req.method + '\t' + parsedUrl.pathname);
	if (isStatic(parsedUrl.pathname)){
		var resourcePath = path.join(__dirname, parsedUrl.pathname);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		fs.createReadStream(resourcePath, {encoding : 'utf8'}).pipe(res);
	} else if (parsedUrl.pathname === '/calculator' && req.method === 'GET'){
		var queryData = querystring.parse(parsedUrl.query),
			op = queryData.op,
			n1 = parseInt(queryData.n1, 10),
			n2 = parseInt(queryData.n2, 10);

		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (parsedUrl.pathname === '/calculator' && req.method === 'POST'){
		var reqData = '';
		req.on('data', function(chunk){
			reqData += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(reqData),
				op = bodyData.op,
				n1 = parseInt(bodyData.n1, 10),
				n2 = parseInt(bodyData.n2, 10);

			var result = calculator[op](n1, n2);
			res.write(result.toString());
			res.end();
		});
		
	} else {
		res.statusCode = 404;
		res.end();
	}
});

server.listen(8080);

console.log("Server listening on port 8080!!");
