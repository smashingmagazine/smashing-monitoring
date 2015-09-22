/*global require, module */
var psi = require('psi'),
	Promise = require('promise');


module.exports = function (config) {
	var run = function (site,succeed, fail) {


			psiAllSites(site).done(function (data) {
				//console.log(success[2].score);
				succeed(data);
			}, function (err) {
				fail(err);
			});
		},


		psiAllSites = function (site) {
			return Promise.all(site.map(runPsi));
		},


		runPsi = function (site) {
			return new Promise(function (resolve, reject) {
				psi(site.url, {'key': config.key, 'strategy': site.strategy}, function (err, data) {
					if (err) {
						reject(err);
						return;
					}

					data.psiUrl = data.id;
					data.date = Date.now();
					data.url = site.url;
					data.strategy = site.strategy;
					data.ads = site.ads;
					console.log('score ' + data.id+' '+data.score);
					resolve(data);

				});
			});
		};

	return {
		'run': run
	}

};