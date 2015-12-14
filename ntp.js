var net = require('net');
module.exports = function(inPort){
	var server = net.createServer(function (socket) {
		socket.end(getDate());  
	});
	function getDate(){
		function formatToTwoDigit(inToTwoDigit){
			var strToTwoDigit = inToTwoDigit.toString();
			if (strToTwoDigit.length == 1){
				return '0' + inToTwoDigit;
			}
			return strToTwoDigit;
		}
		var date = new Date();
		var outDate = date.getFullYear().toString() + '-' +
			          formatToTwoDigit(date.getMonth() + 1) + '-' +
			          formatToTwoDigit(date.getDate()) + ' ' +
			          formatToTwoDigit(date.getHours()) + ':' +
			          formatToTwoDigit(date.getMinutes()) + '\n';
		return outDate;
	}
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


