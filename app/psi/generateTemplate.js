var jade = require('jade'),
	fs = require('fs'),
	createCsv = require('./createCsv'),
	AWS = require('aws-sdk'),
	minify = require('html-minifier').minify,
	moment = require('moment'),
	gbuf = require('gzip-buffer'),

	upload = require('./uploadToS3');



module.exports = function (result, cb) {
	'use strict';
	var resultArray = [];
    result.forEach(function(item){
		item.isoDate = new Date(item.date).toISOString();
        resultArray.push(item);
    });





    resultArray.sort(function(a,b){
        return b.date - a.date;
    });


	createCsv(resultArray,function(csvLocation){
		fs.readFile(__dirname + '/views/app.js', 'utf8', function (err,js) {
			fs.readFile(__dirname + '/views/app.css', 'utf8', function (err,css) {

			jade.renderFile(__dirname + '/views/list.jade', {'css':css,'js':js,sites: resultArray,'moment':moment,'csvLocation':csvLocation}, function (err, html) {

				if (err) {
					cb.fail(err);
					return;
				}
				html = minify(html, {
					removeAttributeQuotes: true
				});

				fs.writeFile('dist/lokal.html',html,function(){});

				gbuf.gzip(html, function(zipped){
					upload('index.html',zipped, 'text/html','gzip', function () {
						cb.succeed('file written');
					});
				});








			});

			});
		});

	});


};
