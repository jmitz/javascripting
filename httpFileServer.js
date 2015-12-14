var http = require('http');
var fs = require('fs');
module.exports = function(inPort, inFileName){
	var server = http.createServer(function (request, response) {
		response.writeHead(200, {'content-type:': 'text/plain'});
		fileStream = fs.createReadStream(inFileName);
		fileStream.pipe(response);
	});
	server.on('error', function (err) {
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


