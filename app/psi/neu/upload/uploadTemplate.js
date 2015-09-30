/*global require, Buffer */
var Promise = require('promise'),
	upload = require('./uploadToAmazonS3');


module.exports = function (filename,html) {
	'use strict';

	return new Promise(function (fulfill, reject) {
		// filename, image, encoding, mime, callback
		upload(filename, html, 'text/html','', function (err) {
			if(err){
				reject(err);
			}
			else {
				fulfill('yo yo, uploaded done');
			}
		});
	});
};


