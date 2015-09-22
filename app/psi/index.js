'use strict';

var config = require('./config')(),
	psi = require('./psiScore')(config),
	db = require('./dynamodb'),
	sites = {
		'stern': [
			{'url': 'http://www.stern.de/', 'strategy': 'desktop', 'ads': true},
			{'url': 'http://mobil.stern.de/?ss', 'strategy': 'mobile', 'ads': true},
			{'url': 'http://www.stern.de/?disableGujAd=1', 'strategy': 'desktop', 'ads': false},
			{'url': 'http://mobil.stern.de/?disableGujAd=1', 'strategy': 'mobile', 'ads': false}
		]



	};
exports.handler = function(event, context){
	psi.run(sites.stern, function(data){
		var row = data[0];
		row.related = [];
		row.related.push(data[1]);
		row.related.push(data[2]);
		row.related.push(data[3]);


		db(row);
		context.succeed('yyyyy');
	},context.fail);
};




