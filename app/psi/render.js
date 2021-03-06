var Promise = require('promise'),

	compress = require('./compress'),
	template = require('./template'),


	psi = require('./psiWrapper'),
	dynamoDb = require('./database/dynamoDb'),
	uploadTemplate = require('./upload/uploadTemplate'),
	tenantName = 'smashing-monitoring';

var render = function(fulfill, reject){

    dynamoDb.getSites(tenantName)
// CSV erzeugen
		.then(function (data) {

			return new Promise.resolve(data);
			// kein Error handling!!

		}, function (err) {
			console.log(err);
		})
		.then(function (data) {
			data.tenant = tenantName;
			

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
};

render(function(){},function(err){
	console.log(err);
});
