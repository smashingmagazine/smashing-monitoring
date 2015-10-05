module.exports = function (data) {

    'use strict';
    var result = {
        series : {
            'desktop': [],
            'mobile': []

        },

        'labels': []
    };


    data.slice().reverse().slice(-50).forEach(function (item) {
        result.labels.push('""');
        result.series.desktop.push(item.score);
		result.series.mobile.push(item.related['smashing-mobile'].score);


    });
    return result;

};

