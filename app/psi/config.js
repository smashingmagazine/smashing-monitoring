/* global module */
module.exports = {
	'psiKey': 'AIzaSyBj4Ayjtf-mQo5MLbIxc-Qs_lWBI12BzZI',
	'bucketName': 'smashing-monitoring',
	'region': 'us-east-1',
	'dynamodbTableName': 'smashing-monitoring',
	'tenants': [
		{
			'tenantName': 'smashing-monitoring',
			'sites': [
				{'label': 'desktop', 'url': 'http://www.smashingmagazine.com/', 'strategy': 'desktop'},
				{'label': 'mobile', 'url': 'http://www.smashingmagazine.com/', 'strategy': 'mobile'}
			]}
	]
};

