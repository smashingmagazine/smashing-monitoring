/*global require, Buffer */
var Promise = require('promise'),
	upload = require('./uploadToAmazonS3');


module.exports = function (site) {
	'use strict';

	return new Promise(function (fulfill, reject) {
		// filename, image, encoding, mime, callback
		upload.send(site.filename, new Buffer(site.data.screenshot.data, 'base64'), 'image/jpeg','', function () {
			delete site.data.screenshot;
			console.log('upload done: '+site.filename);
			fulfill(site);
		}, reject);
	});
};


