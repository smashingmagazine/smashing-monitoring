var json2csv = require('json2csv'),
    Promise = require('promise');

module.exports = function (data) {
    'use strict';
    return new Promise(function (fulfill, reject) {
        var csv = [];

        data.sort(function (a, b) {
            return b.date - a.date;
        });

        data.forEach(function (item) {
            csv.push({'date': new Date(item.date).toISOString(),
                'desktop': item.sites.guardian.score,
                'mobile': item.sites['guardian-mobile'].score

            });
        });

        json2csv({data: csv, fields: ['date', 'desktop', 'mobile']}, function (err, csv) {
            if (err) {
                console.log(err);
                reject(err);

            }
            else {
                console.log('guardian csv success');
                fulfill(csv);
            }


        });


    });
};
