var sites = require('./database/dynamoDb'),
	template = require('./template'),
	uploadTemplate = require('./upload/uploadTemplate');


sites.getSites()
	.then(template)
	.then(gzip)
	.then(function(html){
		'use strict';
		return uploadTemplate('index.html',html,'text/html');
	})
	.then(function (msg) {
		console.log(msg);
	}, function (err) {
		console.log('damn');
		console.log(err);
	});