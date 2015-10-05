var Promise = require('promise'),
	mapRelated = require('./psiWrapper/mapRelated'),
	compress = require('./compress'),
	template = require('./template'),
	csv = require('./csv'),
	mapPsiData = require('./psiWrapper/mapPsiData'),
	uploadScreenshot = require('./upload/uploadScreenshot'),
	psi = require('./psiWrapper'),
	dataMapping = require('./dataMapping'),
	dynamoDb = require('./database/dynamoDb'),
	uploadCsv = require('./upload/uploadCsv'),
	uploadTemplate = require('./upload/uploadTemplate');


var runAllSites = function (tenant) {
		'use strict';


		var runSite = function (site) {
			return new Promise(function (fulfill) {
				psi(site)
					// Ergebnis mappen (müsste kein Promise haben)
					.then(function (data) {
						return mapPsiData(site, data);
					})
					// Screenshot hochladen
					.then(function (site) {
						return uploadScreenshot(tenant.tenantName, site);
					})
					.then(function () {
						fulfill(site);

					}, function (err) {
						console.log(err);
					});
			});

		};
		return Promise.all(tenant.sites.map(runSite));
	};





module.exports = function (tenant) {
		'use strict';
		return  new Promise(function (fulfill, reject) {
			runAllSites(tenant).done(function (data) {

				var tenantName = tenant.tenantName;
				data = mapRelated(data);
				data.tenant = tenantName;

				// Ergebnis speichern
				dynamoDb.saveSite(data)
					// alle Ergebnisse holen
					.then(dynamoDb.getSites)
					// CSV erzeugen
					.then(function (data) {
						csv(data)
							.then(compress)
							.then(function (csvData) {
								return uploadCsv(tenantName, csvData);

							})
							.then(function () {

							}, function (err) {
								reject(err);

							});
						return new Promise.resolve(data);
						// keine Error handling!!

					}, function (err) {
						console.log(err);
					})
					.then(function (data) {
						data.tenant = tenantName;
						template.rows(data).then(compress).then(function (rows) {
							uploadTemplate(tenantName, 'rows.html', rows);
						}, function (err) {
							console.log(err);
						});

						return template.index(tenantName, data);
					}, function (err) {
						console.log(err);
					})
					// gzippen
					.then(compress)
					// zu S3 hochladen
					.then(function (html) {
						return uploadTemplate(tenantName, 'index.html', html);
					})
					.then(function () {
						fulfill({});
					}, reject);

			});
		});
};


