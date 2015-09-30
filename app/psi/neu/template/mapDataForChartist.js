module.exports = function (data) {

	'use strict';
	var result = {
		'seriesDesktop': [],
		'seriesMobile': [],
		'labels': []};


	data.slice().reverse().slice(-50).forEach(function (item) {
		result.labels.push(' ');
		result.seriesDesktop.push(item.score);
		result.seriesMobile.push(item.related[0].score);

	});
	return result;

};

