var url = require('url'),
	querystring = require('querystring');

module.exports = function(req, res, next){
	req.urlData = url.parse(req.url === '/' ? '/index.html' : req.url);
	req.queryData = querystring.parse(req.urlData.query);
	if (req.method === 'POST'){
		var reqData = '';
		req.on('data', function(chunk){
			reqData += chunk;
		});
		req.on('end', function(){
			req.bodyData = querystring.parse(reqData),
			next();
		});
	} else {
		next();
	}
}