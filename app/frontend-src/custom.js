/*global window, Zepto, document, console, moment */

(function (window, document, $, moment) {
    'use strict';
    $('ready', function () {
        var $img,
            $date = $('.date'),
            timeAgo = function () {
                $date.each(function () {
                    var $element = $(this);
                    $element.text(moment($element.attr('data-date')).fromNow());
                });

            },
            lastSrc;
        $('.screenshot').append('<img />');
        $img = $('.screenshot img');
        $img.on('load', function () {
            $img.addClass('show');
        });
        $img.on('error', function(){
            $img.removeClass('show');
        });


        $('[data-label]').on('mouseover', function () {
            var $element = $(this),
                src = 'https://s3-us-west-2.amazonaws.com/stern-psi/screenshots/' + $element.attr('data-label') + '.jpg';
            $img.addClass('show');
            if (lastSrc !== src) {
                $img.attr('src', src);
                lastSrc = src;

            }

        });
        window.setInterval(timeAgo, 1000);


    });


    new Chartist.Line('.ct-chart', {
        'labels': labels,
        'series': [series]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        }
    });


})(window, document, Zepto, moment);
