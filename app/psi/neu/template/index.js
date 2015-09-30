var jade = require('jade'),
	fs = require('fs'),
	minify = require('html-minifier').minify,
	moment = require('moment'),
	Promise = require('promise'),
	readFile = function (filename, enc) {
		'use strict';
		return new Promise(function (fulfill, reject) {
			fs.readFile(filename, 'utf8', function (err, res) {
				if (err) {
					reject(err);
				}
				else {
					fulfill(res);
				}
			});
		});
	},
	isoDate = function(item){
		'use strict';
		item.isoDate = new Date(item.date).toISOString();
	},
	readFiles = function(filenames) {
		'use strict';
		return Promise.all(filenames.map(readFile));
};

module.exports = function (data) {
	'use strict';

	return new Promise(function (fulfill, reject) {

		readFiles(['./template/assets/app.css', './template/assets/app.js']).done(function (assets) {
			var css = assets[0],
				js = assets[1],
				csvLocation = 'data.csv',
				chartist = require('./mapDataForChartist')(data);



			// Iso Date hinzufügen
			data.map(isoDate);
			data.sort(function (a, b) {
				return b.date - a.date;
			});

			jade.renderFile('./template/jade/list.jade', {
				'css': css,
				'js': js,
				'labels':chartist.labels,
				'seriesMobile':chartist.seriesMobile,
				'seriesDesktop':chartist.seriesDesktop,
				sites: data,
				'moment': moment,
				'csvLocation': csvLocation
			}, function (err, html) {
				if (err) {
					reject(err);
				}
				else {
					html = minify(html, {
						removeAttributeQuotes: true
					});
					fulfill(html);
				}
			});



		}, function (err) {
			console.log(err);
		});


	});
};


/*fs.writeFile('../../dist/dummy.json',JSON.stringify(result),function(err,data){
 console.log(err);
 });*/

/*
 'use strict';
 var resultArray = [],
 seriesDesktop = [],
 seriesMobile = [],
 labels = [];


 result.forEach(function (item) {
 item.isoDate = new Date(item.date).toISOString();
 resultArray.push(item);
 });


 resultArray.sort(function (a, b) {
 return b.date - a.date;
 });

 resultArray.slice().reverse().slice(-50).forEach(function(item,i,arr){
 labels.push(' ');
 seriesDesktop.push(item.score);
 seriesMobile.push(item.related[0].score);
 });


 createCsv(resultArray, function (csvLocation) {
 fs.readFile(__dirname + '/views/app.js', 'utf8', function (err, js) {
 fs.readFile(__dirname + '/views/app.css', 'utf8', function (err, css) {

 jade.renderFile(__dirname + '/views/list.jade', {
 'css': css,
 'js': js,
 'labels':labels,
 'seriesMobile':seriesMobile,
 'seriesDesktop':seriesDesktop,
 sites: resultArray,
 'moment': moment,
 'csvLocation': csvLocation
 }, function (err, html) {

 if (err) {
 cb.fail(err);
 return;
 }
 html = minify(html, {
 removeAttributeQuotes: true
 });


 if (cb) {
 gbuf.gzip(html, function (zipped) {
 upload('index.html', zipped, 'text/html', 'gzip', function () {
 cb.succeed('file written');
 });
 });
 }
 else {
 // test
 fs.writeFile('../../dist/lokal.html', html, function (err,data) {
 if(err){
 console.log(err);
 }
 console.log('lokal written');

 });
 }


 });

 });
 });

 });


 };*/
