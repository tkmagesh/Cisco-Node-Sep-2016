var fs = require('fs'),
	path = require('path');

var staticResExtns = ['.html', '.css', '.js', '.jpg','.png','.xml','.json','.txt'];

function isStatic(resourcePath){
	return staticResExtns.indexOf(path.extname(resourcePath)) !== -1;
}

module.exports = function(req, res){
	if (isStatic(req.urlData.pathname)){
		var resourcePath = path.join(__dirname, req.urlData.pathname);
		if (!fs.existsSync(resourcePath)){
			res.statusCode = 404;
			res.end();
			return;
		}
		//fs.createReadStream(resourcePath, {encoding : 'utf8'}).pipe(res);
		var stream = fs.createReadStream(resourcePath, {encoding : 'utf8'});
		stream.on('data', function(chunk){
			console.log('[serveStatic - data event] - writing data to the res stream');
			res.write(chunk);
		});
		stream.on('end', function(){
			console.log('[serveStatic - end event] - finished writing data to the res stream');
			res.end();
		});
	}
}