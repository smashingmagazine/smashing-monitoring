var json2csv = require('json2csv'),
	Promise = require('promise');

/*TODO tenant mapper */
module.exports = function (data) {
	'use strict';
	return new Promise(function (fulfill, reject) {
		var csv = [];

		data.forEach(function (item) {
			csv.push({'date': item.date, 'desktop': item.score, 'mobile': 1});
		});

		json2csv({data: csv, fields: ['date', 'desktop', 'mobile']}, function (err, csv) {
			if (err) {
                console.log(err);
				reject(err);

			}
			else {
                console.log('csv success');
				fulfill(csv);
			}


		});


	});
};
