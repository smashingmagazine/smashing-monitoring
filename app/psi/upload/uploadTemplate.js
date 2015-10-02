/*global require, Buffer */
var Promise = require('promise'),
	upload = require('./uploadToAmazonS3');



module.exports = function (filename,html) {
	'use strict';

	return new Promise(function (fulfill, reject) {


		// filename, data, encoding, mime, callback
		upload(filename, html, 'text/html;charset=utf-8','gzip', function (err,data) {
			if(err){
				console.log('upload '+filename+' error');
				reject(err);
			}
			else {
				console.log(filename+' uploaded');
				fulfill('yo yo, template upload done: '+data.Location);
			}
		});
	});
};


