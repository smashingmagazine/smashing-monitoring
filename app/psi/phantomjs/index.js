/*global require */
var Promise = require('promise'),
	AWS = require('aws-sdk');

module.exports = function (data) {
	'use strict';
	return new Promise(function (fulfill) {
		var tenant = data.tenant,
			uuid = data.uuid;

		for (var property in data.sites) {
			if (data.sites.hasOwnProperty(property)) {
				var params = {
						FunctionName: 'phantomjs',
						InvocationType: 'Event',
						Payload: new Buffer(JSON.stringify({'tenant': tenant, 'uuid': uuid, 'label': property,'url':property.url}))
					},
					lambda = new AWS.Lambda();
				lambda.invoke(params, function (err, response) {
					if (err) {
						console.log(err);
					}
				});
			}
		}

		fulfill(data.tenant);

	});
};


