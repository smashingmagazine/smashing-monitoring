module.exports = function (data) {

	'use strict';
	var result = {
		series : {
			'desktop': [],
			'desktopWithout': [],
			'mobile': [],
			'mobileWithout': []
		},

		'labels': []
	};


	data.slice().reverse().slice(-50).forEach(function (item) {
		result.labels.push('""');
		result.series.desktop.push(item.score);
		result.series.desktopWithout.push(item.related[1].score);
		result.series.mobile.push(item.related[0].score);
		result.series.mobileWithout.push(item.related[2].score);

	});
	return result;

};

