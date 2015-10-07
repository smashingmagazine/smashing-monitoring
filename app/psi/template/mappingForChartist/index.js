module.exports = function (data) {
	'use strict';
	var result = {
		'labels': [],
		'series': {}
	};

	data.forEach(function (item) {
		result.labels.push('');

        if(!result.series[item.label]){
            result.series[item.label] = [];
        }
        result.series[item.label].push(item.score);


		for (var property in item.related) {
			if (item.related.hasOwnProperty(property)) {
				if(!result.series[property]){
					result.series[property] = [];
				}
				result.series[property].push(item.related[property].score);

			}
		}
	});
	//console.log(result);
	return result;
};

