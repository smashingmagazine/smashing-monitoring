var config = require('./config')(),
	AWS = require('aws-sdk');


module.exports = function (filename, content, contentType, cb) {

	'use strict';

	var params = {Bucket: config.bucketName, Key: filename, 'ContentType':contentType,Body: content},

		upload = new AWS.S3.ManagedUpload({params: params});
	upload.send(function (err, data) {
		if (err) {
			console.log(err);
		}
		else {
			//console.log(data);
			cb(data.Location);
		}

	});


};
