var AWS = require('aws-sdk'),
	Promise = require('promise'),
	config = require('./config')();

module.exports = function (filename, content, contentType, contentEncoding, cb) {
	'use strict';
	var params = {ACL: 'public-read', Bucket: config.bucketName, Key: filename, 'ContentEncoding': contentEncoding, 'ContentType': contentType, Body: content},

		upload = new AWS.S3.ManagedUpload({params: params});
	upload.send(function (err, data) {
		if (err) {
			cb(err);
		}
		else {
			cb(null, data);
		}
	});
};
