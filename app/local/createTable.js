var AWS = require('aws-sdk'),
	dyn,
	config = require('../psi/config')(),
	params = {
		AttributeDefinitions: [
			/* required */
			{
				AttributeName: 'id', /* required */
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
				AttributeName: 'id', /* required */
				KeyType: 'HASH' /* required */
			},
			{
				AttributeName: 'date', /* required */
				KeyType: 'RANGE' /* required */
			}

			/* more items */
		],
		ProvisionedThroughput: { /* required */
			ReadCapacityUnits: 3, /* required */
			WriteCapacityUnits: 3 /* required */
		},
		TableName: 'stern_de'



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