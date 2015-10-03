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

		result.series.desktopWithout.push(item.related['desktop-without-ads'].score);
		result.series.mobile.push(item.related['mobile-with-ads'].score);
		result.series.mobileWithout.push(item.related['mobile-without-ads'].score);

	});
	return result;

};

