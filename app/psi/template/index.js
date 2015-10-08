var jade = require('jade'),
	fs = require('fs'),
	minify = require('html-minifier').minify,
	moment = require('moment'),
	Promise = require('promise'),
	chartistMapper = require('./mappingForChartist'),
	defaultTemplateDir = './template/jade/default',
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
	'rows': function (rows) {
		'use strict';
		return new Promise(function (fulfill, reject) {

			var templateDir = './template/jade/' + rows.tenant,
				render = function () {
					jade.renderFile(templateDir + '/row.jade', {'sites': rows.slice(3), 'moment': moment}, function (err, row) {
						if (err) {
							reject(err);
						}
						else {
							console.log('row rendered');
							fulfill(row);
						}
					});
				};
			/* TODO DRY!!*/
			fs.readdir(templateDir, function (err) {
				if (err) {
					templateDir = defaultTemplateDir;
				}
				render();
			});


		});

	},
	'index': function (tenant, data) {
		'use strict';
		return new Promise(function (fulfill, reject) {
			readFiles(['./template/assets/app.css', './template/assets/app.js']).done(function (assets) {
				var css = assets[0],
					js = assets[1],
					csvLocation = 'data.csv',
					chartist = chartistMapper(data),
					templateDir = './template/jade/' + data.tenant,
					render = function () {
						jade.renderFile(templateDir + '/list.jade', {
							'css': css,
							'js': js,
							'chartist': chartist,
							sites: data,
							'moment': moment,
							'csvLocation': csvLocation
						}, function (err, html) {
							if (err) {
								console.log(err);
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
					};

                //console.log(chartist);

				// Iso Date hinzufügen
				data.map(isoDate);

				// nach Datum sortieren
				data.sort(function (a, b) {
					return b.date - a.date;
				});
				/* TODO DRY!!*/
				fs.readdir(templateDir, function (err) {
					if (err) {
						templateDir = defaultTemplateDir;
					}
					render();
				});


			}, function (err) {
				console.log('read file error');
				console.log(err);
			});


		});
	}

};
