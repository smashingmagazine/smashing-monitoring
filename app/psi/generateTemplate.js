var jade = require('jade'),
	fs = require('fs'),
	AWS = require('aws-sdk'),
//http = require('http');
	moment = require('moment'),
	upload = require('./uploadToS3');


module.exports = function (result, cb) {
	'use strict';
	jade.renderFile(__dirname + '/views/list.jade', {sites: result,'moment':moment}, function (err, html) {

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
