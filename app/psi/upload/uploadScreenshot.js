/*global require, Buffer */
var Promise = require('promise'),
	upload = require('./uploadToAmazonS3');


module.exports = function (tenant,site) {
	'use strict';

	return new Promise(function (fulfill, reject) {
		// filename, image, encoding, mime, callback
		upload(tenant,site.filename, new Buffer(site.screenshot, 'base64'), 'image/jpeg','', function () {
			delete site.screenshot;
			console.log('upload done: '+tenant+'/'+site.filename);
			fulfill(site);
		}, reject);
	});
};


