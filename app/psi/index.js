var config = require('./config'),
	psi = require('./psiWrapper'),
	Promise = require('promise'),
	csv = require('./csv'),
	dynamoDb = require('./database/dynamoDb'),
	mapPsiData = require('./psiWrapper/mapPsiData'),
	mapRelated = require('./psiWrapper/mapRelated'),
	template = require('./template'),
	uploadTemplate = require('./upload/uploadTemplate'),
	uploadCsv = require('./upload/uploadCsv'),
	dataMapping = require('./dataMapping'),
	compress = require('./compress'),
	uploadScreenshot = require('./upload/uploadScreenshot');


dynamoDb.init(config);

exports.handler = function (event, context) {
	'use strict';
	var tenants = config.tenants,


		runAllSites = function (tenant) {
			return Promise.all(function(){
				var arr = [];

				tenant.sites.forEach(function(site){
					arr.push(runSite(tenant.tenantName,site));
				});
				return arr;

			}());
		},


		runSite = function (name,site) {
			return new Promise(function (resolve) {
				psi(site)
					// Ergebnis mappen (müsste kein Promise haben)
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



	runAllSites(tenants[0]).done(function (data) {
		var tenantName = tenants[0].tenantName;
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
			},function(){
				console.log('noooo');
			})
			.then(function(data){
				template.rows(tenantName,dataMapping.getLastRow(data)).then(compress).then(function(rows){
					uploadTemplate('rows.html', rows);
				},function(err){
					console.log(err);
				});
				return template.index(tenantName,data);
		},function(err){
			console.log(err);
		})

			// gzippen
			.then(compress)
			// zu S3 hochladen
			.then(function (html) {
				return uploadTemplate('index.html', html);
			})
			.then(context.succeed, context.fail);
	},context.fail);


};

