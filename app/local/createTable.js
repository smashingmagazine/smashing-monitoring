var AWS = require('aws-sdk'),
	dyn,
	config = require('../psi/config')(),
	params = {
		AttributeDefinitions: [
			/* required */
			{
				AttributeName: 'url', /* required */
				AttributeType: 'S' /* required */
			},
			{
				AttributeName: 'date', /* required */
				AttributeType: 'N' /* required */
			}
			/* more items */
		],
		KeySchema: [
			{
				AttributeName: 'url', /* required */
				KeyType: 'HASH' /* required */
			},
			{
				AttributeName: 'date', /* required */
				KeyType: 'RANGE' /* required */
			}

			/* more items */
		],
		ProvisionedThroughput: { /* required */
			ReadCapacityUnits: 5, /* required */
			WriteCapacityUnits: 5 /* required */
		},
		TableName: config.dynamodbTableName



	};


AWS.config.update({region: 'us-east-1'});
dyn = new AWS.DynamoDB();





dyn.createTable(params, function (err, data) {
	'use strict';
	if (err) {
		console.log(err);
	}
	else {
		console.log('table created');
	}
});