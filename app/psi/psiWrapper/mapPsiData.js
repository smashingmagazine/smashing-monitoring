var Promise = require('promise'),
	shortid = require('shortid');




module.exports = function (site,data) {
	'use strict';

	return new Promise(function (fulfill) {
		var uuid = shortid.generate();
		site.screenshot = data.screenshot.data.replace(/_/g, '/');
		site.score = data.ruleGroups.SPEED.score;
		site.filename = 'screenshots/' + site.label + '-' + uuid + '.jpg';
		fulfill(site);

	});
};