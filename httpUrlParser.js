var http = require('http');
var url = require('url');
module.exports = function(inPort, inFileName){
	var server = http.createServer(function (request, response) {
		var date = new Date();
		var urlInfo = url.parse(request.url, true);
		var returnInfo = {};
		var data;
		if (urlInfo.query.iso){
			date.setTime(Date.parse(urlInfo.query.iso));
			if (urlInfo.pathname === '/api/parsetime'){
				returnInfo.hour = date.getHours();
				returnInfo.minute = date.getMinutes();
				returnInfo.second = date.getSeconds();
				data = JSON.stringify(returnInfo);
			}
			else if (urlInfo.pathname === '/api/unixtime'){
				returnInfo.unixtime = date.getTime();
				data = JSON.stringify(returnInfo);

			}
			if (data){
				response.writeHead(200, {'content-type': 'text/json'});
				response.end(data);
			}
			else {
				response.writeHead(404);
				response.end();
			}
		}

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


