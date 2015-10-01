var Promise = require('promise'),
	config = {key: 'AIzaSyCWbyD03vYEPzDPX9TYJaU-X7Zm3BMbMF8'},
	psi = require('psi');
module.exports = function (site) {
	'use strict';
	return new Promise(function (fulfill, reject) {
		psi(site.url, {'key': config.key, 'strategy': site.strategy, 'screenshot': true}, function (err, res) {
			if(err){
				reject(err);
			}
			if (typeof res.ruleGroups === 'undefined') {
				reject('please patch psi to API Version 2');
			}
			else {
				console.log('psi: '+res.id +' ('+res.ruleGroups.SPEED.score+')');
				fulfill(res);
			}

		});
	});
};