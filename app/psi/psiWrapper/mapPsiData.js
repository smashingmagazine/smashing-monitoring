var Promise = require('promise'),
	shortid = require('shortid');


module.exports = function (site,data) {
	'use strict';

	return new Promise(function (fulfill, reject) {

		var date = Date.now(),
			id = 'str-' + date + '-' + shortid.generate();

	
		delete data.formattedResults;

		if(data.title ===''){
			data.title = '%%no_title%%';
		}

		site.data = data;
		site.data.screenshot.data = data.screenshot.data.replace(/_/g, '/');
		site.score = data.ruleGroups.SPEED.score;
		site.id = id;
		site.date = date;
		site.filename = 'screenshots/' + site.label + '-' + site.id + '.jpg';

		fulfill(site);

	});
};