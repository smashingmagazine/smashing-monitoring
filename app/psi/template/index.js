var jade = require('jade'),
	fs = require('fs'),
	minify = require('html-minifier').minify,
	moment = require('moment'),
	Promise = require('promise'),
	readFile = function (filename) {
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
	isoDate = function (item) {
		'use strict';
		item.isoDate = new Date(item.date).toISOString();
	},
	readFiles = function (filenames) {
		'use strict';
		return Promise.all(filenames.map(readFile));
	};

module.exports = {
	'rows' : function(tenant,rows){
		'use strict';
		return new Promise(function (fulfill, reject) {
			jade.renderFile('./template/jade/'+tenant+'/row.jade',{'sites':rows,'moment':moment},function(err,row){
				if(err){
					reject(err);
				}
				else {
					console.log('row rendered');
					fulfill(row);
				}
			});
		});

	},
	'index': function (tenant,data) {
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
				jade.renderFile('./template/jade/'+tenant+'/list.jade', {
					'css': css,
					'js': js,
					'labels': chartist.labels,
					'series': chartist.series,
					sites: data,
					'moment': moment,
					'csvLocation': csvLocation
				}, function (err, html) {
					if (err) {
						console.log('jade error');
						reject(err);
					}
					else {
						html = minify(html, {
							removeAttributeQuotes: true
						});
						//console.log('jade success');
						fulfill(html);
					}
				});


			}, function (err) {
				console.log('read file error');
				console.log(err);
			});


		});
	}

};
