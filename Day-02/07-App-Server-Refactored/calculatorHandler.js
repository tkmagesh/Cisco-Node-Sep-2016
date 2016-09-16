var querystring = require('querystring'),
	calculator = require('./calculator');
	
module.exports = function(req, res){
	if (req.urlData.pathname === '/calculator' && req.method === 'GET'){
		var queryData = req.queryData,
			op = queryData.op,
			n1 = parseInt(queryData.n1, 10),
			n2 = parseInt(queryData.n2, 10);

		var result = calculator[op](n1, n2);
		res.write(result.toString());
		res.end();
	} else if (req.urlData.pathname === '/calculator' && req.method === 'POST'){
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
		
	}
}