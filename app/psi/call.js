(function(){
	'use strict';
	var sites = require('./database/dynamoDb'),
		template = require('./template'),
		Promise = require('promise'),
		uploadTemplate = require('./upload/uploadTemplate'),
		uploadCsv = require('./upload/uploadCsv'),
		compress = require('./compress'),
		csv = require('./csv');

	sites.getSites()
		.then(function(data){
			csv(data).then(compress).then(uploadCsv);
			return new Promise.resolve(data);
		})

		.then(function (msg) {
			console.log(msg);
		}, function (err) {
			console.log(err);
		});
})();
