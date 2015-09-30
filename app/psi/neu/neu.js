var config = require('./../config')(),
	psi = require('./psi/psi'),
	Promise = require('promise'),
	dynamoDb = require('./database/dynamoDb'),
	mapPsiData = require('./psi/mapPsiData'),
	mapRelated = require('./psi/mapRelated'),
	template = require('./template'),
	uploadScreenshot = require('./upload/uploadScreenshot');


exports.handler = function (event, context) {
	'use strict';
	var sites = [
			{'label':'desktop-with-ads','url': 'http://www.stern.de/', 'strategy': 'desktop', 'ads': true},
			{'label':'mobile-with-ads','url': 'http://mobil.stern.de/', 'strategy': 'mobile', 'ads': true},
			{'label':'desktop-without-ads','url': 'http://www.stern.de/?disableGujAd=1', 'strategy': 'desktop', 'ads': false},
			{'label':'mobile-without-ads','url': 'http://mobil.stern.de/?disableGujAd=1', 'strategy': 'mobile', 'ads': false}
		],


		runAllSites = function (sites) {
			return Promise.all(sites.map(runSite));
		},


		runSite = function (site) {
			return new Promise(function (resolve, reject) {
				psi(site)
					.then(function (data) {
						return mapPsiData(site, data);
					})
					.then(uploadScreenshot)
					.then(function (data) {
						resolve(site);

					});
			});

		};


	runAllSites(sites).done(function (data) {
		data = mapRelated(data);

		dynamoDb.saveSite(data)
		.then(dynamoDb.getSites)
		.then(template)
		.then(function(err){
			console.log('err');
			console.log(err);
		},function(err){
			console.log('ok');
			console.log('err');
		});


	}, function (err) {
		console.log(err);
	});


};


exports.handler();
