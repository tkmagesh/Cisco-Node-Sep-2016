module.exports = function(req, res, next){
	console.log('[notFoundHandler] - writing 404');
	res.statusCode = 404;
	res.end();
	next();
}