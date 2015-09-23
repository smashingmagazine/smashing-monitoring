'use strict';

var config = require('./config')(),
	psi = require('./psiScore')(config),
	db = require('./dynamodb');
exports.handler = function (event, context) {
	psi.run({'succeed': function (data) {
		var row = data[0];
		row.related = [];
		row.related.push(data[1]);
		row.related.push(data[2]);
		row.related.push(data[3]);
		db.put(row,context);
	}, 'fail': function(){
		context.fail();
	}});
};




