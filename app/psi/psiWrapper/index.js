var Promise = require('promise'),
	config = require('../config'),
	psi = require('psi');

module.exports = function (site) {
	'use strict';
	return new Promise(function (fulfill, reject) {
		psi(site.url, {'key': config.psiKey, 'strategy': site.strategy, 'screenshot': true}, function (err, res) {
			if(err){
				reject(err);
			}
			else if (typeof res.ruleGroups === 'undefined') {
				reject('please patch psi to API Version 2');
			}
			else {
				console.log('psi: '+res.id +' ('+res.ruleGroups.SPEED.score+')');
				fulfill(res);
			}
		});
	});
};