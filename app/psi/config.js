/* global module */
module.exports = {
	'psiKey': 'AIzaSyAmPCTn1BIafHs-W9qGuTJylNOQGfsaMiQ',
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

