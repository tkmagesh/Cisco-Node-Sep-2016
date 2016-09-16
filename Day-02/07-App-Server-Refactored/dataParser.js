var url = require('url'),
	querystring = require('querystring');

module.exports = function(req){
	req.urlData = url.parse(req.url === '/' ? '/index.html' : req.url);
	req.queryData = querystring.parse(req.urlData.query);
}