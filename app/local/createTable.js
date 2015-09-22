var AWS = require('aws-sdk'),
	dyn,
	tableName,
params;


AWS.config.update({region: 'us-east-1'});
dyn = new AWS.DynamoDB();


tableName = 'str';
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
	TableName: tableName



};


dyn.createTable(params, function (err, data) {

	if (err){
		console.log(err);
	}
	else    {
		console.log('table created');
	}
});