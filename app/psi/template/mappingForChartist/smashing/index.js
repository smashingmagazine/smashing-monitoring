module.exports = function (data) {

    'use strict';
    var result = {
        series : {
            'desktop': [],
            'desktopWithout': []

        },

        'labels': []
    };


    data.slice().reverse().slice(-50).forEach(function (item) {
        result.labels.push('""');
        result.series.desktop.push(item.score);



    });
    return result;

};

