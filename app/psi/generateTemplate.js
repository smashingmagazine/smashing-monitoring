var jade = require('jade'),
	fs = require('fs'),
	AWS = require('aws-sdk'),
//http = require('http');
	moment = require('moment'),
	upload = require('./uploadToS3');


module.exports = function (result, cb) {
	'use strict';
	var resultArray = [];
    result.forEach(function(item){
		item.isoDate = new Date(item.date).toISOString();
        resultArray.push(item);
    });
    resultArray.sort(function(a,b){
        //console.log(typeof b.date);
        return b.date - a.date;
    });
	jade.renderFile(__dirname + '/views/list.jade', {sites: resultArray,'moment':moment}, function (err, html) {

		if (err) {
			cb.fail(err);
			return;
		}

		upload('index.html',html,'text/html',function(){
			cb.succeed('file written');
		});


		/*

		fs.writeFile(__dirname + '/../../dist/index.html', html, function (err) {

			if (err) {
				console.log('jade fail');
				cb.fail(err);
			}
			else {
				console.log('jade file written');
				cb.succeed('file written');
			}

		});
		*/

	});
};
