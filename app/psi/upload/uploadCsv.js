/*global require, Buffer */
var Promise = require('promise'),
	upload = require('./uploadToAmazonS3');


module.exports = function (data) {
	'use strict';

	return new Promise(function (fulfill, reject) {
		// filename, image, encoding, mime, callback
		upload('data.csv', data, 'text/csv','gzip', function () {
			console.log('csv upload done');
			fulfill('csv upload done');
		}, reject);
	});
};


