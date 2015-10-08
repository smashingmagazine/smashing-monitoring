var shortid = require('shortid');


module.exports = function (data) {
	'use strict';
	var date = Date.now(),
		uuid = shortid.generate(),
		row = {'uuid':uuid,'date':date,'tenant':data[0].tenant};

	row.sites = {};

	data.forEach(function (site) {
		row.sites[site.label] = site;
	});
	return row;
};