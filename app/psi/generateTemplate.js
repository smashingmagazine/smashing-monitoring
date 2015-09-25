var jade = require('jade'),
	fs = require('fs'),
	createCsv = require('./createCsv'),
	AWS = require('aws-sdk'),
//http = require('http');
	moment = require('moment'),
	upload = require('./uploadToS3');


module.exports = function (result, cb) {
	'use strict';
	var resultArray = [];
    result.forEach(function(item){
		item.isoDate = new Date(item.date).toISOString();
        resultArray.push(item);
    });





    resultArray.sort(function(a,b){
        //console.log(typeof b.date);
        return b.date - a.date;
    });


	createCsv(resultArray,function(csvLocation){

		jade.renderFile(__dirname + '/views/list.jade', {sites: resultArray,'moment':moment,'csvLocation':csvLocation}, function (err, html) {

			if (err) {
				cb.fail(err);
				return;
			}

			upload('index.html',html,'text/html',function(){
				cb.succeed('file written');
			});


		});
	});


};
