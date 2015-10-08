module.exports = function (data) {
	'use strict';
	var result = {
		'labels': [],
		'series': {}
	};

	data.forEach(function (item) {
		result.labels.push('');

		for (var property in item.sites) {
			if (item.sites.hasOwnProperty(property)) {
				if(!result.series[property]){
					result.series[property] = [];
				}
				result.series[property].push(item.sites[property].score);

			}
		}
	});
	return result;
};

