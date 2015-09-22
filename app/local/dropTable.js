var AWS = require('aws-sdk'),
	dyn,
	tableName = 'str',
	params;


AWS.config.update({region: 'us-east-1'});
dyn = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
dyn.deleteTable({'TableName':tableName},function (error) {
	if (error) {
		console.log('no table')
	} else {
		console.log("Table ", tableName, " Dropped!");
		//callback(null);
		/*
		dyn.listTables(function (err, data) {
			console.log('listTables', err, data);
		});
		*/

	}});