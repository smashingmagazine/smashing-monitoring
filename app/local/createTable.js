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
			ReadCapacityUnits: 7, /* required */
			WriteCapacityUnits: 7 /* required */
		},
        "GlobalSecondaryIndexes": [
            {
                "IndexName": "tenant-index",
                "KeySchema": [
                    {
                        "AttributeName": "tenant",
                        "KeyType": "HASH"
                    }
                ],
                "Projection": {

                    "ProjectionType": "ALL"
                },

                "ProvisionedThroughput": {
                    "ReadCapacityUnits": 5,
                    "WriteCapacityUnits": 5
                }
            }
        ],
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
		console.log('table '+config.dynamodbTableName+' created');
	}
});