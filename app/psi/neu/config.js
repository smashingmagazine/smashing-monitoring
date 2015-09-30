/* global module */
module.exports = function () {
	'use strict';
	return {
		'key': 'AIzaSyCWbyD03vYEPzDPX9TYJaU-X7Zm3BMbMF8',
		'bucketName':'stern-psir',
		'region':'us-east-1',
		'dynamodbTableName': 'stern_de',
		'sites': {
			'stern': [
				{'label':'desktop-with-ads','url': 'http://www.stern.de/', 'strategy': 'desktop', 'ads': true},
				{'label':'mobile-with-ads','url': 'http://mobil.stern.de/', 'strategy': 'mobile', 'ads': true},
				{'label':'desktop-without-ads','url': 'http://www.stern.de/?disableGujAd=1', 'strategy': 'desktop', 'ads': false},
				{'label':'mobile-without-ads','url': 'http://mobil.stern.de/?disableGujAd=1', 'strategy': 'mobile', 'ads': false}
			]
		}
	};
};

