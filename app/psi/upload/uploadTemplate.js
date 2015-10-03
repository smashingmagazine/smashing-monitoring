/*global require, Buffer */
var Promise = require('promise'),
	upload = require('./uploadToAmazonS3');



module.exports = function (tenant,filename,html) {
	'use strict';

	return new Promise(function (fulfill, reject) {


		// filename, data, encoding, mime, callback
		upload(tenant,filename, html, 'text/html;charset=utf-8','gzip', function (err,data) {
			if(err){
				console.log('upload '+filename+' error');
				reject(err);
			}
			else {
				console.log(tenant+'/'+filename+' uploaded');
				fulfill('yo yo, template upload done: '+data.Location);
			}
		});
	});
};


