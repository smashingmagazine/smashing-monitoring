var config = require('./config')(),
	psi = require('./psiWrapper'),
	Promise = require('promise'),
	csv = require('./csv'),
	dynamoDb = require('./database/dynamoDb').init(config),
	mapPsiData = require('./psiWrapper/mapPsiData'),
	mapRelated = require('./psiWrapper/mapRelated'),
	template = require('./template'),
	uploadTemplate = require('./upload/uploadTemplate'),
	uploadCsv = require('./upload/uploadCsv'),
	compress = require('./compress'),
	uploadScreenshot = require('./upload/uploadScreenshot');


exports.handler = function (event, context) {
	'use strict';
	var sites = [
			{'label': 'desktop-with-ads', 'url': 'http://www.stern.de/', 'strategy': 'desktop', 'ads': true},
			{'label': 'mobile-with-ads', 'url': 'http://mobil.stern.de/', 'strategy': 'mobile', 'ads': true},
			{'label': 'desktop-without-ads', 'url': 'http://www.stern.de/?disableGujAd=1', 'strategy': 'desktop', 'ads': false},
			{'label': 'mobile-without-ads', 'url': 'http://mobil.stern.de/?disableGujAd=1', 'strategy': 'mobile', 'ads': false}
		],


		runAllSites = function (sites) {
			return Promise.all(sites.map(runSite));
		},


		runSite = function (site) {
			return new Promise(function (resolve, reject) {
				psi(site)
					// Ergebnis mappen (müsste kein Promise haben
					.then(function (data) {
						return mapPsiData(site, data);
					})
					// Screenshot hochladen
					.then(uploadScreenshot)
					.then(function () {
						resolve(site);

					},function(err){
						console.log(err);
					});
			});

		};


	runAllSites(sites).done(function (data) {
		data = mapRelated(data);
		// Ergebnis speichern
		dynamoDb.saveSite(data)
			// alle Ergebnisse holen
			.then(dynamoDb.getSites)
			// CSV erzeugen
			.then(function (data) {
				csv(data)
				.then(compress)
				.then(uploadCsv);
				return new Promise.resolve(data);
			})
			// Template erzeugen
			.then(template)
			// gzippen
			.then(compress)
			// zu S3 hochladen
			.then(function (html) {
				return uploadTemplate('index.html', html);
			})

			.then(function (msg) {
				console.log(msg);
			}, function (err) {
				console.log('damn');
				console.log(err);
			});


	}, function (err) {
		console.log(err);
	});


};

// debug
exports.handler();
