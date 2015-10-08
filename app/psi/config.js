/* global module */
module.exports = {
		'psiKey': 'AIzaSyBj4Ayjtf-mQo5MLbIxc-Qs_lWBI12BzZI',
		'bucketName':'speed-monitor-with-timings',
		'region':'us-east-1',
		'dynamodbTableName': 'speed-monitor-with-timings',
		'tenants': [
			{
				'tenantName': 'stern',
				'sites': [
					{'label':'desktop-with-ads','url': 'http://www.stern.de/', 'strategy': 'desktop'},
					{'label':'mobile-with-ads','url': 'http://mobil.stern.de/', 'strategy': 'mobile'},
					{'label':'desktop-with-ads-async','url': 'http://www.stern.de/?async=1', 'strategy': 'desktop'},
					{'label':'desktop-without-ads','url': 'http://www.stern.de/?disableGujAd=1', 'strategy': 'desktop'},
					{'label':'mobile-without-ads','url': 'http://mobil.stern.de/?disableGujAd=1', 'strategy': 'mobile'}
				]},
			{
				'tenantName': 'smashing',
				'sites': [
					{'label':'smashing','url': 'http://www.smashingmagazine.com/', 'strategy': 'desktop'},
					{'label':'smashing-mobile','url': 'http://www.smashingmagazine.com/', 'strategy': 'mobile'}
				]}
		]
};

