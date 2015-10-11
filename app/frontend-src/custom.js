/*global window, Zepto, document, console, moment, Chartist,series,labels */

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
        $img.on('error', function () {
            $img.removeClass('show');
        });


        $('[data-screenshot]').on('mouseover', function () {
            var $element = $(this),
                src = $element.attr('data-screenshot');
            $img.addClass('show');
            if (lastSrc !== src) {
                $img.attr('src', src);
                lastSrc = src;

            }

        });
        window.setInterval(timeAgo, 1000);


    });

    $('.js-more').on('click', function () {
        $('.table').toggleClass('more');
    });

    if (typeof labels !== 'undefined' && typeof series !== 'undefined') {
        Chartist.Line('.ct-chart', {
            'labels': labels,
            'series': series
        }, {
            fullWidth: true,
            chartPadding: {
                right: 40
            }
        });
    }


})(window, document, Zepto, moment);
