var config = require('../config')(),
	AWS = require('aws-sdk'),
	Promise = require('promise');

console.log(config.bucketName);
module.exports = function (filename, content, contentType, contentEncoding, cb) {
	'use strict';
	var params = {ACL: 'public-read', Bucket: config.bucketName, Key: filename, 'ContentEncoding': contentEncoding, 'ContentType': contentType, Body: content},

		upload = new AWS.S3.ManagedUpload({params: params});
	upload.send(function (err) {
		if (err) {
			cb(err);
		}
		else {
			cb(null, {});
		}
	});
};
