var AWS = require('aws-sdk'),
	dyn,
	tableName = 'str',
	params;


AWS.config.update({region: 'us-east-1'});
dyn = new AWS.DynamoDB();
dyn.deleteTable({'TableName':tableName},function (error) {
	if (error) {
		console.log(error)
	} else {
		console.log("Table ", tableName, " Dropped!");
		//callback(null);
		/*
		dyn.listTables(function (err, data) {
			console.log('listTables', err, data);
		});
		*/

	}});