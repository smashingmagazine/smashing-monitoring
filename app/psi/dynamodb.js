var AWS = require('aws-sdk'),
	dyn,
	attr = require('dynamodb-data-types').AttributeValue,
	tableName = 'str';


AWS.config.update({region: 'us-east-1'});
dyn = new AWS.DynamoDB();


module.exports = function(data){
	hey = attr.wrap(data);
	dyn.putItem(
		{
			"TableName": tableName,
			"Item": hey
		}, function (err) {
			if (err) {
				console.log(err);

			}

		});

};

/*var params = {
	TableName: tableName,
	Limit: 10

};

dyn.scan(params, function (err, data) {
	if (err) {
		console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
	} else {
		console.log("Query succeeded.");

		data.Items.forEach(function (item) {

			console.log(attr.unwrap(item));


		});
	}
});*/





