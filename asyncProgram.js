var http = require('http');
var sites = [
	{
		url: process.argv[2],
		string: '',
		read: 0
	},{
		url: process.argv[3],
		string: '',
		read: 0
	},{
		url: process.argv[4],
		string: '',
		read: 0
	}
]
sites.forEach(function(site){
	http.get(site.url, function(response){
		response.setEncoding('utf8');
		response.on('data', function(data){
			site.string += data;
		});
		response.on('end', function(data){
			site.read = 1;
			var readCount = 0;
			sites.forEach(function(site){
				readCount += site.read;
			});
			if (readCount == 3){
				sites.forEach(function(site){
					console.log(site.string);
				});
			}		
		});
	});
});
