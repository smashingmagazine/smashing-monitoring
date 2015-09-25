var json2csv = require('json2csv'),
	fields = ['desktop', 'mobile', 'desktop-without-ads', 'mobile-without-ads'],
	AWS = require('aws-sdk'),
	upload = require('./uploadToS3');

module.exports = function (data, cb) {
	'use strict';
	var csv = [];

	data.forEach(function (item) {
		csv.push({'date':item.isoDate,'desktop': item.score, 'mobile': item.related[0].score, 'desktop-without-ads': item.related[1].score, 'mobile-without-ads': item.related[2].score});
	});

	json2csv({data: csv, fields: ['date','desktop', 'mobile', 'desktop-without-ads', 'mobile-without-ads']}, function (err, csv) {
		if (err) {
			console.log(err);
			cb();

		}
		upload('data.csv', csv, 'text/csv', function (location) {
			console.log('upload done');
			cb();
		});

	});


};


