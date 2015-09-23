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
					if (err) {
						reject(err);
						return;
					}
                    if(typeof data.ruleGroups === 'undefined'){
                        reject('please patch psi to API Version 2');
                        return;
                    }
                    data.url = data.id;
					data.id = 'str-'+Date.now()+'-'+shortid.generate();

                    delete data.formattedResults;
					data.psiUrl = data.id;
					data.date = Date.now();
					data.url = site.url;
					data.strategy = site.strategy;
					data.ads = site.ads;


					data.score = data.ruleGroups.SPEED.score;
					data.screenshot.data = data.screenshot.data.replace(/_/g,'/');
					data.screenshot.data = data.screenshot.data.replace(/-/g,'+');


					//'

					upload('screenshots/'+data.date+site.label+'.jpg',new Buffer(data.screenshot.data, 'base64'),'image/jpeg',function(location){
						data.screenshot = location;
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