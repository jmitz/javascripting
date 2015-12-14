var http = require('http');
var map = require('through2-map');
module.exports = function(inPort, inFileName){
	var server = http.createServer(function (request, response) {
		response.writeHead(200, {'content-type:': 'text/plain'});
		request.pipe(map(function(chunk){
			return chunk.toString().toUpperCase();
		})).pipe(response);
	});
	server.on('error', function (err) {
		console.log(err);
	  if (err.code == 'EADDRINUSE') {
	    console.log('Address in use, retrying...');
	    setTimeout(function () {
	      server.close();
	      server.listen(inPort);
	    }, 1000);
	  }
	});
	server.listen(inPort)
}


