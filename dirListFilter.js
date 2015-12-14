var fs = require('fs');

module.exports = function (inDirectory, inExtension, callback){
	var reExtension = RegExp('\\.' + inExtension + '$');
	fs.readdir(inDirectory, function(err, fileList){
		if (err) {
			return callback(err);
		}
		callback(null, fileList.filter(function(file){
			return reExtension.test(file);
		}));
	});
}
