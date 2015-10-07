module.exports = function (data) {
	'use strict';
	var row = data[0];
	row.related = {};
	// den ersten Index löschen

	// Hier auf Array wechseln!!!
	data.splice(1).forEach(function (relatedSite) {
		row.related[relatedSite.label] = relatedSite;
	});
	return row;
};