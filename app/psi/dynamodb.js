var AWS = require('aws-sdk'),
	attr = require('dynamodb-data-types').AttributeValue,
	template = require('./generateTemplate'),
	db,
	config = require('./config')();





module.exports = {put: function (data, cb) {
	'use strict';
	var item = attr.wrap(data);
	AWS.config.update({region: 'us-east-1'});
	db = new AWS.DynamoDB();
	db.putItem(
		{
			'TableName': config.dynamodbTableName,
			'Item': item
		}, function (err) {
			if (err) {
				cb.fail(err);

			}

			console.log('entry saved to dynamodb');
			module.exports.run(cb);


		});
},
	run: function (cb) {
		'use strict';
		AWS.config.update({region: 'us-east-1'});
		db = new AWS.DynamoDB();
		db.scan({'TableName': config.dynamodbTableName, 'Limit': 1000}, function (err, data) {
			if (err) {
				console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
			} else {
				console.log('Query succeeded.');
				template(data.Items.map(attr.unwrap), cb);

			}
		});

	}
};



