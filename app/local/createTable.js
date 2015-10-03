var AWS = require('aws-sdk'),
	dyn,
	config = require('../psi/config'),
	params = {
		AttributeDefinitions: [
			/* required */
            {
                AttributeName: 'tenant', /* required */
                AttributeType: 'S' /* required */
            },

            {
				AttributeName: 'uuid', /* required */
				AttributeType: 'S' /* required */
			}

			/* more items */
		],
		KeySchema: [
            {
                AttributeName: 'tenant', /* required */

                KeyType: 'HASH' /* required */
            },
            {
				AttributeName: 'uuid', /* required */
				KeyType: 'RANGE' /* required */
			}



			/* more items */
		],
		ProvisionedThroughput: { /* required */
			ReadCapacityUnits: 3, /* required */
			WriteCapacityUnits: 3 /* required */
		},
		TableName: 'cctv-neu'



	};


AWS.config.update({region: 'us-east-1','LogLevel':1});
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