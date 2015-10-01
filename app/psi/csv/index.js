var json2csv = require('json2csv'),
	Promise = require('promise'),
	fields = ['desktop', 'mobile', 'desktop-without-ads', 'mobile-without-ads'];


module.exports = function (data) {
	'use strict';
	return new Promise(function (fulfill, reject) {
		var csv = [];
		data.forEach(function (item) {
			csv.push({'date': item.date, 'desktop': item.score, 'mobile': item.related[0].score, 'desktop-without-ads': item.related[1].score, 'mobile-without-ads': item.related[2].score});
		});

		json2csv({data: csv, fields: ['date', 'desktop', 'mobile', 'desktop-without-ads', 'mobile-without-ads']}, function (err, csv) {
			if (err) {
				reject(err);

			}
			else {
				fulfill(csv);
			}


		});


	});
};
