module.exports = function (data) {
	'use strict';
	var row = data[0];
	row.related = [];
	// den ersten Index löschen
	data.splice(1).forEach(function (relatedSite) {
		row.related.push(relatedSite);
	});
	return row;
};