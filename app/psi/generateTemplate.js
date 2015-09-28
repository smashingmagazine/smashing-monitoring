var jade = require('jade'),
    fs = require('fs'),
    createCsv = require('./createCsv'),
    AWS = require('aws-sdk'),
    minify = require('html-minifier').minify,
    moment = require('moment'),
    gbuf = require('gzip-buffer'),

    upload = require('./uploadToS3');


module.exports = function (result, cb) {
    /*fs.writeFile('../../dist/dummy.json',JSON.stringify(result),function(err,data){
     console.log(err);
     });*/
    'use strict';
    var resultArray = [],
        seriesDesktop = [],
        seriesMobile = [],
        labels = [];


    result.forEach(function (item) {
        item.isoDate = new Date(item.date).toISOString();
        resultArray.push(item);
    });


    resultArray.sort(function (a, b) {
        return b.date - a.date;
    });

    resultArray.slice().reverse().slice(-50).forEach(function(item,i,arr){
        labels.push(' ');
        seriesDesktop.push(item.score);
        seriesMobile.push(item.related[0].score);
    });


    createCsv(resultArray, function (csvLocation) {
        fs.readFile(__dirname + '/views/app.js', 'utf8', function (err, js) {
            fs.readFile(__dirname + '/views/app.css', 'utf8', function (err, css) {

                jade.renderFile(__dirname + '/views/list.jade', {
                    'css': css,
                    'js': js,
                    'labels':labels,
                    'seriesMobile':seriesMobile,
                    'seriesDesktop':seriesDesktop,
                    sites: resultArray,
                    'moment': moment,
                    'csvLocation': csvLocation
                }, function (err, html) {

                    if (err) {
                        cb.fail(err);
                        return;
                    }
                    html = minify(html, {
                        removeAttributeQuotes: true
                    });


                    if (cb) {
                        gbuf.gzip(html, function (zipped) {
                            upload('index.html', zipped, 'text/html', 'gzip', function () {
                                cb.succeed('file written');
                            });
                        });
                    }
                    else {
                        // test
                        fs.writeFile('../../dist/lokal.html', html, function (err,data) {
                            if(err){
                                console.log(err);
                            }
                            console.log('lokal written');

                        });
                    }


                });

            });
        });

    });


};
