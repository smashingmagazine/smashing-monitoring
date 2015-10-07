var json2csv = require('json2csv'),
	Promise = require('promise');

/*TODO tenant mapper */
module.exports = function (data) {
	'use strict';
	return new Promise(function (fulfill, reject) {
		var csv = [];

        data.sort(function (a, b) {
            return b.date - a.date;
        });

		data.forEach(function (item) {
			csv.push({'date': new Date(item.date).toISOString(),
                'desktop-with-ads': item.score,
                'desktop-without-ads': item.related['desktop-without-ads'].score,
                'desktop-with-ads-async':(item.related['desktop-with-ads-async']?item.related['desktop-with-ads-async'].score : ''),
                'mobile-with-ads':item.related['mobile-with-ads'].score,
                'mobile-without-ads': item.related['mobile-without-ads'].score
            });
		});

		json2csv({data: csv, fields: ['date', 'desktop-with-ads', 'desktop-without-ads','desktop-with-ads-async','mobile-with-ads','mobile-without-ads']}, function (err, csv) {
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
