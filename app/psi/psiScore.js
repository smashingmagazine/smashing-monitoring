/*global require, module */
var psi = require('psi'),
	Promise = require('promise'),
	shortid = require('shortid'),

	upload = require('./uploadToS3');


module.exports = function (config) {
	'use strict';
	var run = function (cb) {

			psiAllSites(config.sites.stern).done(function (data) {
				cb.succeed(data);



			}, function (err) {
				//console.log('error');
				//console.log(err);
				cb.fail(err);
			});
		},


		psiAllSites = function (sites) {
			return Promise.all(sites.map(runPsi));
		},


		runPsi = function (site) {
			return new Promise(function (resolve, reject) {
				psi(site.url, {'key': config.key, 'strategy': site.strategy,'screenshot':true}, function (err, data) {
					var date = Date.now(),
                        id = 'str-'+date+'-'+shortid.generate();
                    if (err) {
						reject(err);
						return;
					}
                    if(typeof data.ruleGroups === 'undefined'){
                        reject('please patch psi to API Version 2');
                        return;
                    }
                    data.url = data.id;
					data.id = id;

                    delete data.formattedResults;
					data.psiUrl = data.id;
					data.date = date;
					data.url = site.url;
					data.strategy = site.strategy;
					data.ads = site.ads;
					data.label = site.label;

					data.score = data.ruleGroups.SPEED.score;
					data.screenshot.data = data.screenshot.data.replace(/_/g,'/');





					upload('screenshots/'+data.label+'-'+id+'.jpg',new Buffer(data.screenshot.data, 'base64'),'','image/jpeg',function(location){
						delete data.screenshot;
						//console.log(location);
						resolve(data);
						});


				});
			});
		};

	return {
		'run': run
	};

};