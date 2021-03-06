var fs = require('fs'),
	path = require('path');

var staticResExtns = ['.html', '.css', '.js', '.jpg','.png','.xml','.json','.txt'];

function isStatic(resourcePath){
	return staticResExtns.indexOf(path.extname(resourcePath)) !== -1;
}

module.exports = function(staticResourcePath){
	return function(req, res, next){
		if (isStatic(req.urlData.pathname)){
			var resourcePath = path.join(staticResourcePath, req.urlData.pathname);
			if (!fs.existsSync(resourcePath)){
				res.statusCode = 404;
				res.end();
				return;
			}
			fs.createReadStream(resourcePath, {encoding : 'utf8'}).pipe(res);
		} else {
			next();
		}
	}
}