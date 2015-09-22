'use strict';


var AWS = require('aws-sdk'),
	dyn,

	template = require('./generateTemplate.js'),
	attr = require('dynamodb-data-types').AttributeValue,
	tableName = 'str',
	hey = [];






AWS.config.update({region: 'us-east-1'});
dyn = new AWS.DynamoDB();
exports.handler = function(event, context){
	dyn.scan({'TableName':tableName,'Limit':100}, function (err, data) {
		if (err) {
			console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
		} else {
			console.log("Query succeeded.");
			//console.log(Object.keys(data.Items).length);
		//	console.log(template(Object.keys(data.Items)));
			data.Items.forEach(function (item) {

				hey.push(attr.unwrap(item));
				console.log(attr.unwrap(item).score);
				//console.log(attr.unwrap(item));


			});
			template(hey);

		}
	});


	context.succeed('get');
};




