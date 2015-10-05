var Promise = require('promise'),
	shortid = require('shortid');


module.exports = function (site,data) {
	'use strict';

	return new Promise(function (fulfill) {

		var date = Date.now(),
			id = shortid.generate();

	

		site.screenshot = data.screenshot.data.replace(/_/g, '/');
		site.score = data.ruleGroups.SPEED.score;
		site.uuid = id;
		site.date = date;

		site.filename = 'screenshots/' + site.label + '-' + site.uuid + '.jpg';

		fulfill(site);

	});
};