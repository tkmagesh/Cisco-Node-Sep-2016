var fs = require('fs');

var stream = fs.createReadStream('./test-big.txt', {encoding : 'utf8'});

//ReadStream (Readable)
/* events - open, data, end, close, error */

/*

var readCount = 0;

stream.on('data', function(chunk){
	++readCount;
	console.log(chunk);
});

stream.on('end', function(){
	console.log('Thats all folks!!!');
	console.log('Read operation completed with ', readCount, ' reads');
});

*/

stream.pipe(process.stdout);

var readCount = 0;

stream.on('data', function(chunk){
	++readCount;
	
});

stream.on('end', function(){
	console.log('Read operation completed with ', readCount, ' reads');
});


