/*global require, Buffer */
var Promise = require('promise'),
	upload = require('./uploadToAmazonS3');



module.exports = function (filename,html) {
	'use strict';

	return new Promise(function (fulfill, reject) {


		// filename, image, encoding, mime, callback
		upload(filename, html, 'text/html','gzip', function (err,data) {
			if(err){
				reject(err);
			}
			else {
				fulfill('yo yo, template upload done: '+data.Location);
			}
		});
	});
};


