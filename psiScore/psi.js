/*global require */
var psi = require('psi'),
	config = require('../config'),
	model = require('../model/model-mongodb')(config),
	Promise = require('promise');
module.exports = function (config) {
	var
		// cb ist create()
		related = {},
		run = function (site,cb) {
			console.log('run');
			psi(site.url, {'key': config.psi.key, 'strategy': site.strategy}, function (err, data) {
				var fn = function (site){ // sample async action
					return new Promise(function(resolve){
						psi(site.url, {'key': config.psi.key, 'strategy': site.strategy},function(err,data){
							data.strategy = site.strategy;
							data.ads = site.ads;
							data.url = site.url;
							data.psiUrl = data.id;
							delete data.id;
							related[site.strategy+''+site.ads] = data;
							resolve();
						});
					});
				};
				data.psiUrl = data.id;

				data.related = site.related;
				delete data.id;
				data.date = new Date();
				data.url = site.url;
				data.strategy = site.strategy;
				data.ads = site.ads;



				if(site.related){
					console.log('related!');
					var results = Promise.all(site.related.map(fn)); // pass array of promises
					results.then(function(){
						data.related = related;
						cb(data,function(){

							console.log('Saved');
						});
					});
				}










			});

		};



			// http://stackoverflow.com/questions/11486779/formatting-isodate-from-mongodb











	return {
		'run': run
	}

};