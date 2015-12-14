var http = require('http');
var url = require('url');
module.exports = function(inPort, inFileName){
	var server = http.createServer(function (request, response) {
		var date = new Date();
		var urlInfo = url.parse(request.url, true);
		var returnInfo = {};
		if (urlInfo.query.iso){
			date.setTime(Date.parse(urlInfo.query.iso));
			if (urlInfo.pathname === '/api/parsetime'){
				returnInfo.hour = date.getHours();
				returnInfo.minute = date.getMinutes();
				returnInfo.second = date.getSeconds();
			}
			else if (urlInfo.pathname === '/api/unixtime'){
				returnInfo.unixtime = date.getTime();
			}
			var data = JSON.stringify(returnInfo);
			response.writeHead(200, {'content-type': 'text/json'});
			response.end(data);
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


