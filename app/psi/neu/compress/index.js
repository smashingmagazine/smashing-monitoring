/*global require */
var Promise = require('Promise'),
	gzip = require('gzip-buffer');

module.exports = function (str) {
	'use strict';
	return new Promise(function (fulfill) {
		gzip.gzip(str,function(zipped){
			fulfill(zipped);
		});
	});
};


