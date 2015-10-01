var Promise = require('promise'),
	AWS = require('aws-sdk'),
	config = require('../../../config')(),
	attr = require('dynamodb-data-types').AttributeValue,
	db;


AWS.config.update({region: config.region});
db = new AWS.DynamoDB();


module.exports = {

	'saveSite': function (data) {
		'use strict';
		return new Promise(function (fulfill, reject) {
			var item = attr.wrap(data);

			db.putItem(
				{
					'TableName': config.dynamodbTableName,
					'Item': item
				}, function (err) {
					if (err) {
						reject(err);

					}
					else {
						console.log('entry saved to dynamodb');
						fulfill();
					}
				});
		});
	},
	getSites: function () {
		'use strict';
		return new Promise(function (fulfill, reject) {
			var results = [],

				query = {'TableName': config.dynamodbTableName},
				scan = function () {
					db.scan(query, function (err, data) {
						if (err) {
							reject(err);
						} else {
							results = results.concat(data.Items);
							if (data.LastEvaluatedKey) {
								console.log(data.Items.length);
								query.ExclusiveStartKey = data.LastEvaluatedKey;
								scan(query);
							}
							else {
								console.log('Results: ' + results.length);
								fulfill(results.map(attr.unwrap));

							}
						}
					});
				};
			scan(query);
		});
	}
};