module.exports = function (data) {

	'use strict';
	var result = {
		'labels': [],
		'series': []
	};

	data.slice().reverse().slice(-50).forEach(function (item) {
		result.labels.push('');
		var i = 1;
		if (!result.series[0]) {
			result.series[0] = [];
		}
		result.series[0].push(item.score);

		for (var property in item.related) {
			if (item.related.hasOwnProperty(property)) {
				if(!result.series[i]){
					result.series[i] = [];
				}
				result.series[i].push(item.related[property].score);
				i++;
			}
		}

	});
	//console.log(result);
	return result;

};

