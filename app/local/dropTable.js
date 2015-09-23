var AWS = require('aws-sdk'),
	dyn,
	config = require('../psi/config')(),
	params;


AWS.config.update({region: 'us-east-1'});
dyn = new AWS.DynamoDB();
dyn.deleteTable({'TableName':config.dynamodbTableName},function (error) {
	if (error) {
		console.log(error)
	} else {
		console.log("Table ", config.dynamodbTableName, " Dropped!");
		//callback(null);
		/*
		dyn.listTables(function (err, data) {
			console.log('listTables', err, data);
		});
		*/

	}});