/*global require */
var Promise = require('promise'),
	upload = require('./uploadToAmazonS3');


module.exports = function (tenant,data) {
	'use strict';
	return new Promise(function (fulfill, reject) {
		// filename, image, encoding, mime, callback

        upload(tenant,'data.csv', data, 'text/csv','gzip', function () {
			console.log('csv upload done');
			fulfill('csv upload done');
		}, function(err){
            console.log(err);
        });
	});
};


